const elements = require("../ui/elements");

class HomeLayout extends elements.LayoutHelper {
    setupUI () {
        this.boxes = {
            hp : new elements.ObjectMapper(this.layout.widget, {
                label : "Health points"
            }, {
                status : "Status",
                maxHp : "Maximum HP",
                currentHp : "Current HP",
                temporaryHp : "Temporary HP",
                totalHp : "Total currently available HP"
            }),

            classLvl : new elements.ObjectMapper(this.layout.widget, {
                label : "Class & Level"
            }, {
                name : "Name",
                level : "Level",
                xp : "XP",
                class : "Class",
                race : "Race"
            }),

            funds : new elements.ObjectMapper(this.layout.widget, {
                label : "Funds"
            }, {
                displayedIn : "Displayed in",
                funds : "Current account balance"
            }, {
                tagColor : "yellow",
                dataColor : "green"
            }),

            spellSlots : new elements.List(this.layout.widget, {
                label : "Spell slots"
            }, element => `${element.current} / ${element.max}`, {dataColor : "green"}),

            equippedSpells : new elements.List(this.layout.widget, {
                label : "Equipped spells",
            }, element => {
                let lvl = element.level === "cantrip" ? 0 : element.level;
                return `L${lvl} | ${element.name}`
            }),

            weapons : new elements.List(this.layout.widget, {
                label : "Weapons"
            }, element => `${element.name} (${element.dmg} ${element.type}) (+${element.atkBonus})`, {dataColor : "yellow"}),

            character : new elements.ObjectMapper(this.layout.widget, {
                label : "Character"
            }, {
                armorClass : "[AC] Armor Class",
                proficiencyBonus : "Proficiency Bonus",
                hitDice : {
                    _title : "Hit dice",
                    size : "Size",
                    maxCount : "Max amount of hit dice",
                    currentCount : "Current amount of hit dice"
                },
                walkingSpeed : "Walking Speed (feet / 6s)"
            }, {
                tagColor : "green"
            }),

            spellMeta : new elements.ObjectMapper(this.layout.widget, {
                label : "Spellcasting Info"
            }, {
                spellCastingAbility : "Spell casting ability",
                spellSaveDC : "Spell save difficulty",
                spellAttackBonus : "Spell attack bonus",
                maxEquippedSpells : "Maximum spells equipped at once"
            }, {
                tagColor : "blue",
                dataColor : "green"
            })
        }
    }

    //TODO: general list
    // - test if subscription based updating sends only correct data

    onLoad () {
        this.client.subscribe("base");
        this.client.subscribe("spells");
        this.client.requestData("base");
        this.client.requestData("spells");
    }

    onHide () {
        this.client.unsubscribe("base");
        this.client.unsubscribe("spells");
    }

    onData_spells ({data : spells}) {
        this.boxes.spellSlots.setContent(spells.spellSlots);
        this.boxes.spellMeta.setContent(spells);
        this.boxes.equippedSpells.setContent(spells.equipped.flat())

        this.base.render();
    }

    onData_base ({data : base}) {
        this.boxes.classLvl.setContent(base);
        this.boxes.funds.setContent({...base, displayedIn : "GP"});
        this.boxes.hp.setContent({
            ...base.hp,
            status : base.hp.currentHp > 0 ? "Normal" : "{bold}{blink}CRITICAL{/blink}{/bold}",
            totalHp : base.hp.currentHp + base.hp.temporaryHp
        });
        this.boxes.character.setContent({...base, hitDice : {...base.hitDice, size : "1d" + base.hitDice.size}});
        this.boxes.weapons.setContent(base.weapons);

        this.base.render();
    }
}

const homeLayout = (base, client) => {
    let homeLayout = new HomeLayout(base, client);
    return homeLayout.layout;
}

module.exports = homeLayout;