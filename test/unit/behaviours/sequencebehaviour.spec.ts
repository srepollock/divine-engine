import {SequenceBehaviour, Vector3, Entity, SequenceBehaviourData, Action} from "../../../src/";
describe("Sequence Unit Tests", () => {
    let data = new SequenceBehaviourData();
    data.setFromJson(
        {
            "name": "peasent_sequence",
            "type": "sequence",
            "animatedSpriteName": "orcsprite",
            "attackSpriteName": "orc_walk",
            "dieSpriteName": "orc_die",
            "hitSpriteName": "orc_die",
            "walkSpriteName": "orc_walk",
            "idleSpriteName": "orc_walk",
            "jumpSpriteName": "orc_walk",
            "actions": [
                {
                    "start": {
                        "x": 0,
                        "y": 0
                    },
                    "end": {
                        "x": 2,
                        "y": 0
                    },
                    "time": 1,
                    "skip": true
                },
                {
                    "start": {
                        "x": 2,
                        "y": 0
                    },
                    "end": {
                        "x": 4,
                        "y": 0
                    },
                    "time": 2
                },
                {
                    "start": {
                        "x": 4,
                        "y": 0
                    },
                    "end": {
                        "x": 6,
                        "y": 0
                    },
                    "time": 3
                }
            ]
        }
    );
    let sequence = new SequenceBehaviour(data);
    sequence.setOwner(new Entity({name: "temp"}));
    it("should contain a reference to the Entity to run it", () => {
        expect(sequence.getOwner()).not.toBeUndefined;
    });
    it("should contain a reference to the Entity to run it", () => {
        expect(sequence.getOwner()).not.toBeUndefined;
    });    
    it("should run actions on update", () => {
        sequence.update(1); // 1 is Δ time
        let time = sequence.currentAction().time;
        expect(time).toBe(2);
    });
    // it("should allow actions to, after a set time, count on the engine", () => {
    //     sequence.actionIndex = 0;
    //     sequence.update(1); // 1 is Δ time
    //     expect(sequence.currentAction().time).toBe(1);
    //     sequence.update(1);
    //     sequence.update(1);
    //     expect(sequence.currentAction().time).toBe(2);
    //     sequence.update(1);
    //     sequence.update(1);
    //     sequence.update(1);
    //     expect(sequence.currentAction().time).toBe(3);
    // });
});