/* ChunkScope core-structures.js
 * Overworld structure placement for Java 1.18+ (facts from community-verified
 * mechanics; formula mirrors the widely-used cubiomes approach):
 *   region grid of spacing x spacing chunks; per region one attempt at
 *   offset = next31() % (spacing - separation), twice (X then Z);
 *   RNG state = low48(worldSeed + regX*341873128712 + regZ*132897987541 + salt)
 *              then xor 0x5DEECE66D (java.util.Random init).
 * Works on main thread AND inside a Web Worker (attaches to MCAlgo).
 */
(function (root) {
  'use strict';
  var MASK48 = 0xFFFFFFFFFFFFn;
  var MULT = 0x5DEECE66Dn;
  var ADD = 0xBn;

  /* Overworld structure configs (spacing, separation, salt). Source: Mojang
   * world preset (structures section) + community-verified additions. */
  var OVERWORLD_STRUCTURES = [
    { id: 'village',          name: 'Village',          color: '#ffd166', spacing: 32, separation: 8,  salt: 10387312  },
    { id: 'desert_pyramid',   name: 'Desert Pyramid',   color: '#e07b39', spacing: 32, separation: 8,  salt: 14357617  },
    { id: 'igloo',            name: 'Igloo',            color: '#9ec1cf', spacing: 32, separation: 8,  salt: 14357618  },
    { id: 'jungle_pyramid',   name: 'Jungle Pyramid',   color: '#4caf50', spacing: 32, separation: 8,  salt: 14357619  },
    { id: 'swamp_hut',        name: 'Swamp Hut',        color: '#7b6f2d', spacing: 32, separation: 8,  salt: 14357620  },
    { id: 'monument',         name: 'Ocean Monument',  color: '#4dd0e1', spacing: 32, separation: 5,  salt: 10387313  },
    { id: 'mansion',          name: 'Woodland Mansion', color: '#8e7cc3', spacing: 80, separation: 20, salt: 10387319  },
    { id: 'outpost',          name: 'Pillager Outpost', color: '#37474f', spacing: 32, separation: 8,  salt: 165745296 },
    { id: 'ruined_portal',    name: 'Ruined Portal',    color: '#7e57c2', spacing: 40, separation: 15, salt: 34222645  },
    { id: 'shipwreck',        name: 'Shipwreck',        color: '#795548', spacing: 24, separation: 4,  salt: 165745295 },
    { id: 'ocean_ruin',       name: 'Ocean Ruin',       color: '#64b5f6', spacing: 20, separation: 8,  salt: 14357621  },
    { id: 'ancient_city',     name: 'Ancient City',     color: '#5b3a29', spacing: 24, separation: 8,  salt: 20083232  },
    { id: 'trial_chambers',   name: 'Trial Chambers',   color: '#b0bec5', spacing: 34, separation: 8,  salt: 84285879  }
  ];

  var CONFIG = {};
  OVERWORLD_STRUCTURES.forEach(function (c) { CONFIG[c.id] = c; });

  /* Structure attempt chunk position for a region (cubiomes formula). */
  function structureChunkInRegion(worldSeed, regX, regZ, cfg) {
    var s = (worldSeed + BigInt(regX) * 341873128712n + BigInt(regZ) * 132897987541n + BigInt(cfg.salt)) & MASK48;
    var state = (s ^ MULT) & MASK48;
    var range = cfg.spacing - cfg.separation;
    state = (state * MULT + ADD) & MASK48;
    var offX = Number(state >> 17n) % range;
    state = (state * MULT + ADD) & MASK48;
    var offZ = Number(state >> 17n) % range;
    return { x: regX * cfg.spacing + offX, z: regZ * cfg.spacing + offZ };
  }

  /* All structure attempts inside a chunk range (inclusive), per config. */
  function structuresInRange(worldSeed, minX, maxX, minZ, maxZ, ids) {
    var out = [];
    var list = (ids && ids.length) ? ids.map(function (id) { return CONFIG[id]; }).filter(Boolean) : OVERWORLD_STRUCTURES;
    list.forEach(function (cfg) {
      var rx0 = Math.floor(minX / cfg.spacing);
      var rx1 = Math.floor(maxX / cfg.spacing);
      var rz0 = Math.floor(minZ / cfg.spacing);
      var rz1 = Math.floor(maxZ / cfg.spacing);
      var rx, rz, pos;
      for (rx = rx0; rx <= rx1; rx++) {
        for (rz = rz0; rz <= rz1; rz++) {
          pos = structureChunkInRegion(worldSeed, rx, rz, cfg);
          if (pos.x >= minX && pos.x <= maxX && pos.z >= minZ && pos.z <= maxZ) {
            out.push({ id: cfg.id, name: cfg.name, color: cfg.color, x: pos.x, z: pos.z });
          }
        }
      }
    });
    return out;
  }

  var api = {
    OVERWORLD_STRUCTURES: OVERWORLD_STRUCTURES,
    CONFIG: CONFIG,
    structureChunkInRegion: structureChunkInRegion,
    structuresInRange: structuresInRange
  };
  root.MCStructures = api;
})(typeof self !== 'undefined' ? self : window);
