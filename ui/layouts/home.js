const Box = require("../ui/box");
const LayoutHelper = require("../utils/layoutHelper");
const BoxedObjectToStringMapper = require("../utils/boxedObjectToStringMapper");

class HomeLayout extends LayoutHelper {
    setupUI () {
        this.boxes = {
            hp : new BoxedObjectToStringMapper(this.layout.widget, {
                label : "Health points"
            }, {
                status : "Status",
                maxHp : "Maximum HP",
                currentHp : "Current HP",
                temporaryHp : "Temporary HP",
                totalHp : "Total currently available HP"
            }),
            classLvl : new BoxedObjectToStringMapper(this.layout.widget, {
                label : "Class & Level"
            }, {
                name : "Name",
                level : "Level",
                xp : "XP",
                class : "Class"
            }),
            funds : new BoxedObjectToStringMapper(this.layout.widget, {
                label : "Funds"
            }, {
                displayedIn : "Displayed in",
                funds : "Current account balance"
            }, {
                tagColor : "yellow",
                dataColor : "green"
            }),
            spellSlots : new BoxedObjectToStringMapper(this.layout.widget, {
                label : "Spell slots"
            }, {
                1 : "[1]",
                2 : "[2]",
                3 : "[3]",
                4 : "[4]",
                5 : "[5]",
                6 : "[6]",
                7 : "[7]",
                8 : "[8]",
                9 : "[9]",
            }),
            equippedSpells : new Box(this.layout.widget, {
                label : "Equipped spells",
                padding : {
                    top : 1,
                    right : 5,
                    left : 3,
                    bottom : 1
                },
                width : "half"
            }),
            character : new BoxedObjectToStringMapper(this.layout.widget, {
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
            meta : new BoxedObjectToStringMapper (this.layout.widget, {
                label : "Meta",
            }, {
                age : "Age",
                eyes : "Eye color",
                height : "Height",
                hair : "Hair color",
                skin : "Skin color",
                design : "Design inspiration"
            }, {
                tagColor : "blue",
                dataColor : "green"
            }),
            spellMeta : new BoxedObjectToStringMapper(this.layout.widget, {
                label : "Spellcasting Info"
            }, {
                spellCastingAbility : "Spell casting ability",
                spellSaveDC : "Spell save difficulty",
                spellAttackBonus : "Spell attack bonus"
            }, {
                tagColor : "green"
            })
        }
    }

    //funds box
    //lvl and name box

    onLoad () {
        this.client.subscribe("base");
        this.client.requestData("base");
    }

    onHide () {
        this.client.unsubscribe("base");
    }

    onData ({data}) {
        this.boxes.classLvl.setContent(data);
        this.boxes.funds.setContent({...data, displayedIn : "GP"});
        this.boxes.hp.setContent({
            ...data.hp,
            status : data.hp.currentHp > 0 ? "Normal" : "{bold}{blink}CRITICAL{/blink}{/bold}",
            totalHp : data.hp.currentHp + data.hp.temporaryHp
        });
        this.boxes.meta.setContent(data.meta);
        this.boxes.character.setContent(data);

        this.base.render();
    }
}

const homeLayout = (base, client) => {
    let homeLayout = new HomeLayout(base, client);
    return homeLayout.layout;
}

module.exports = homeLayout;