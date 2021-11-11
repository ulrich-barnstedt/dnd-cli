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
                class : "Class"
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
            //TODO: change to list render
            // - format for spell slots: current / total
            spellSlots : new elements.List(this.layout.widget, {
                label : "Spell slots"
            }, element => `${element.current} / ${element.max}`, {dataColor : "green"}),
            //TODO: map somehow
            /*equippedSpells : new Box(this.layout.widget, {
                label : "Equipped spells",
                padding : {
                    top : 1,
                    right : 5,
                    left : 3,
                    bottom : 1
                },
                width : "half"
            }),*/
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
                walkingSpeed : "Walking Speed (feet / 6s)",
                passiveWisdom : "Passive Wisdom (Perception)",
                alignment : "Alignment"
            }, {
                tagColor : "green"
            }),
            spellMeta : new elements.ObjectMapper(this.layout.widget, {
                label : "Spellcasting Info"
            }, {
                spellCastingAbility : "Spell casting ability",
                spellSaveDC : "Spell save difficulty",
                spellAttackBonus : "Spell attack bonus"
            }, {
                tagColor : "blue",
                dataColor : "green"
            })
        }
    }

    //TODO: general list
    // - implement spell index system and port data
    // - implement current spells on this page using index system
    // - implement other pages
    // - implement subcommand system
    // - implement total command functionality
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
        this.boxes.character.setContent(base);

        this.base.render();
    }
}

const homeLayout = (base, client) => {
    let homeLayout = new HomeLayout(base, client);
    return homeLayout.layout;
}

module.exports = homeLayout;