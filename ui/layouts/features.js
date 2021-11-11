const blessed = require("neo-blessed");
const elements = require("../ui/elements");

let statString = {
    base : "Base",
    modifier : "Modifier"
}

class TemplateLayout extends elements.LayoutHelper {
    onLoad () {
        this.client.subscribe("stats");
        this.client.requestData("stats");
    }

    onHide () {
        this.client.unsubscribe("stats");
    }

    setupUI () {
        this.boxes = {
            stats : new elements.ObjectMapper(this.layout.widget, {
                label : "Stats"
            }, {
                strength : {
                    _title : "Strength",
                    ...statString
                },
                dexterity : {
                    _title : "Dexterity",
                    ...statString
                },
                constitution : {
                    _title : "Constitution",
                    ...statString
                },
                intelligence : {
                    _title : "Intelligence",
                    ...statString
                },
                wisdom : {
                    _title : "Wisdom",
                    ...statString
                },
                charisma : {
                    _title : "Charisma",
                    ...statString
                }
            }),
            skills : new elements.ObjectMapper(this.layout.widget, {
                label : "Skills"
            }, {
                acrobatics : "Acrobatics",
                animalHandling : "Animal Handling",
                arcana : "Arcana",
                athletics : "Athletics",
                deception : "Deception",
                history : "History",
                insight : "Insight",
                intimidation : "Intimidation",
                investigation : "Investigation",
                medication : "Medication",
                nature : "Nature",
                perception : "Perception",
                performance : "Performance",
                persuasion : "Persuasion",
                religion : "Religion",
                sleightOfHand : "Sleight of Hand",
                stealth : "Stealth",
                survival : "Survival"
            }, {
                dataColor : "blue",
                tagColor : "green"
            }),
            savingThrows : new elements.ObjectMapper(this.layout.widget, {
                label : "Saving throws"
            }, {
                strength : "Strength",
                dexterity : "Dexterity",
                constitution : "Constitution",
                intelligence : "Intelligence",
                wisdom : "Wisdom",
                charisma : "Charisma"
            }, {dataColor : "green", tagColor : "yellow"}),
            meta : new elements.ObjectMapper (this.layout.widget, {
                label : "Meta",
            }, {
                age : "Age",
                eyes : "Eye color",
                height : "Height",
                hair : "Hair color",
                skin : "Skin color",
                design : "Design inspiration",
                passiveWisdom : "Passive Wisdom (Perception)",
                alignment : "Alignment"
            }, {
                tagColor : "blue",
                dataColor : "green"
            }),
            features : new elements.List(this.layout.widget, {
                label : "Features"
            }, s => s, {dataColor : "green"}, 1),
        }
    }

    onData_stats ({data : stats}) {
        this.boxes.stats.setContent(stats.stats);
        this.boxes.features.setContent(stats.features);
        this.boxes.savingThrows.setContent(stats.savingThrows);
        this.boxes.skills.setContent(stats.skills);
        this.boxes.features.setContent(stats.features);
        this.boxes.meta.setContent(stats.meta);

        this.base.render();
    }
}

const templateLayout = (base, client) => {
    let templateLayout = new TemplateLayout(base, client);
    return templateLayout.layout;
}

module.exports = templateLayout;