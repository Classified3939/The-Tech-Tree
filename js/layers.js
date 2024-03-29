addLayer("p", {
    name: "key compression", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#928989",
    requires: new Decimal(6), // Can be a function that takes requirement increases into account
    resource: "compressed keys", // Name of prestige currency
    baseResource: "basic keys", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
   
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
        if (hasUpgrade('l', 13)) mult = mult.times(upgradeEffect('l', 13))
        if (hasMilestone('l', 1)) mult = mult.times(1.15)
        if (inChallenge('l', 11)) mult = mult.times(0.1)
        mult = mult.times(player.m.magicMastery.pow(0.3).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for compressed keys", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},     upgrades: {
        11: {
            title: "Energetic Key",
            description: "Triple your basic key gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Learning From Experience",
            description: "Increase your basic key gain based on compressed keys.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(0.8)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
        },
        13: {
            title: "Faster Compression",
            description: "Increase your compressed key gain based on basic keys.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            },
         14: {
            title: "Energetic Key II",
            description: "Multiply basic key gain by 1.5",
            cost: new Decimal(30),
        },   
        21: {
            title: "Even Faster Compression",
            description: "Increase your compressed key gain based on basic keys.",
            cost: new Decimal(75),
            effect() {
                return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            },
            22: {
                title: "Energetic Key III",
                description: "Multiply basic key gain by 1.2",
                cost: new Decimal(6750),    
            },   
            
    },
})

addLayer("l", {
    name: "create living keys", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        livingkeys: new Decimal(0),
    }},
    color: "#4d8435",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "living keys", // Name of prestige currency
    baseResource: "compressed keys", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.28, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasChallenge('l', 12)) mult = mult.times(1.45)
        if (hasUpgrade('l', 15)) mult = mult.times(upgradeEffect('l', 15))
        if (hasChallenge('l', 12)) mult = mult.pow(1.15)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for living keys", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},    
    upgrades: {
        11: {
            title: "Living Energetic Key",
            description: "Multiply your basic key gain by 2.5.",
            cost: new Decimal(1),
        },
        12: {
            title: "Key Golem",
            description: "Basic keys boost themselves, But also halves base basic key gain",
            cost: new Decimal(3),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            },
        13: {
            title: "Learning From Life Experience",
            description: "Increase your compressed key gain based on living keys.",
            cost: new Decimal(4),
            effect() {
                return player.l.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },  
        14: {
            title: "Basic Life",
            description: "Increase your basic key gain based on living keys.",
            cost: new Decimal(120),
            effect() {
                return player.l.points.add(1).pow(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },  
        15: {
            title: "Double Life",
            description: "Increase your living key gain based on living keys.",
            cost: new Decimal(1000000),
            effect() {
                return player.l.points.add(1).pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },  
    },   
    milestones: {
        1: {
            requirementDescription: "1 Living Key",
            effectDescription: "1.15x boost to basic and compressed keys",   
            done() { return player.l.points.gte(1) }
        },
        2: {
            requirementDescription: "50 Living Keys",
            effectDescription: "Unlock Key Magic",
            done() { return player.l.points.gte(50) }
        },
        3: {
            requirementDescription: "50,000 Living Keys",
            effectDescription: "5x increase to earth magic gain, 1.5x increase to flame magic gain",
            done() { return player.l.points.gte(50000) }
        },
        4: {
            requirementDescription: "100,000,000 Living Keys",
            effectDescription: "+1 repetition",
            done() { return player.l.points.gte(100000000)},
            onComplete() { player.r.points = player.r.points.add(1)}
         },
        
    },
    challenges: {
        11: {
            name: "Broken Forge",
            challengeDescription: "Basic and compressed key gain is 10 times lower",
            goalDescription: "18 Basic Keys",
            rewardDescription: "Raises basic key gain to ^1.2",
            canComplete: function() {return player.points.gte(18)},
            
        },
        12: {
            name: "Lifeless",
            challengeDescription: "Set living keys to 0. Earth magic is disabled and set to 0.",
            goalDescription: "1e12 Compressed Keys",
            rewardDescription: "Raises and multiplies living key gain (^1.15 & 1.45x)",
            onEnter(){
                player.l.points = player.l.points.mul(0)
                player.m.earthMagic = player.m.earthMagic.mul(0)
            },
            canComplete: function() {return player.p.points.gte(1e12)},
            
        },
    }
    
      
})
addLayer("m", {
    
    startData() { return {                  
        unlocked: false,                     
        points: new Decimal(0),
        flameMagic: new Decimal(0),
        earthMagic: new Decimal(0),
        magicTime: new Decimal(0),
        magicMastery: new Decimal(0)
        
    }},
    

    color: "#8E0AB5",                       // The color for this layer, which affects many elements.
    resource: "key magic",
               
    row: 1,                                  // The row this layer is on (0 is the first row).
    baseResource: "living keys",
    base: 5,                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.l.points },  // A function to return the current amount of baseResource.
    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                        // Also the amount required to unlock the layer.
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.75,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { if (hasMilestone('l', 2))return true },          // Returns a bool for if this layer's node should be visible in the tree.
    upgrades: {
        
    },
    clickables: {
        11: {
            canClick() {return player.m.flameMagic.gte(20)},
            display() {
                return "Fireball - Spend 20 Flame Magic to multiply your current amount of basic keys by " 
                + format(player.points.pow(-0.001).add(0.12).add(player.m.points.div(500)))
            },
            onClick() {
                 player.points = player.points.mul(player.points.pow(-0.001).add(0.12).add(player.m.points.div(500)));
                 player.m.flameMagic = player.m.flameMagic.sub(20);
                 player.m.magicMastery = player.m.magicMastery.add(1);
            }
           },
        12: {
            canClick() {return player.m.earthMagic.gte(15)},
            display() {
                return "Create Living Keys - Spend 15 Earth Magic to create living keys based on Magic Mastery"
            },
            onClick() {
                player.l.points = player.l.points.add(player.m.magicMastery);
                player.m.earthMagic = player.m.earthMagic.sub(15);
                player.m.magicMastery = player.m.magicMastery.add(1);
            }
        }
   
    },
    
 
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        "clickables",
        "blank",
        ["display-text",
        function() { return 'You have ' + format(player.m.flameMagic) + ' Flame Magic' },
        { "color": "darkorange", "font-size": "24px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'You have ' + format(player.m.earthMagic) + ' Earth Magic' },
        { "color": "brown", "font-size": "24px", "font-family": "Libre Baskerville" }],
        ["display-text",
        function() { return 'You have ' + format(player.m.magicMastery) + ' Magic Mastery ' },
        { "color": "purple", "font-size": "24px", "font-family": "Whisper, cursive;" }],
        ["display-text",
        function() { return 'Your magic mastery boosts Basic Key Gain by ' + format(player.m.magicMastery.pow(0.8).add(1)) + 'x' },
        { "color": "white", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'Your magic mastery also boosts Compressed Key Gain by ' + format(player.m.magicMastery.pow(0.3).add(1)) + 'x' },
        { "color": "white", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        "blank",
        ["toggle", ["c", "beep"]],
        "milestones",
        "blank",
        "blank",
        "upgrades"  
    ],
    update(diff) {
        if (hasMilestone ('l', 2)) {
        flameMagicGain = new Decimal(0.1)
        flameMagicGain = flameMagicGain.times(player.m.points)
        if (hasMilestone ('l',3)) flameMagicGain = flameMagicGain.times(1.5)
        player.m.flameMagic = player.m.flameMagic.add(flameMagicGain.times(diff));
        earthMagicGain = new Decimal(0.02)
        earthMagicGain = earthMagicGain.times(player.m.points)
        if (hasMilestone ('l',3)) earthMagicGain = earthMagicGain.times(5)
        if (inChallenge('l',12)) earthMagicGain = earthMagicGain.times(0)
        player.m.earthMagic = player.m.earthMagic.add(earthMagicGain.times(diff));
    }
        
}          
    
})
addLayer("r", {
    startData() { return {                  
        unlocked: true,                    
        points: new Decimal(0),         
    }},
    color: "#4BDC13",                               
    row: "side",
    resource: "repetition",        
    layerShown() {return true},          
    milestones: {
        1: {
            requirementDescription: "1 repetition",
            effectDescription: "Generate 12% of compressed keys per second",
            done() { return player.r.points.gte(1) }
        }
        
    }
})