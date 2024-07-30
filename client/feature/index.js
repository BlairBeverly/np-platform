import { DemoFilterFeature } from "./DemoFilter";
import { LengthLimitFeature } from "./LengthLimitFeature";
import { DemoModerationFeature } from "./DemoModeration";
import { UpvoteFeature } from "./UpvoteFeature";
import { BasicTeaserFeature } from "./BasicTeaserFeature";
import { DemoProfileFeature } from "./DemoProfileFeature";
import { ProfileCommentsFeature } from "./ProfileCommentsFeature";
import { ReplyNotificationsFeature } from "./ReplyNotifsFeature";
import { DesignSystemDemoFeature } from "../demo/designsystem";
import { CommentDemoFeature } from "../demo/commentdemo";
import { CatFeature, DogFeature, GroomingFeature, KomodoDragonFeature, PetSittingFeature, WalkingFeature } from "../demo/fakefeatures";

const { DemoFeature, DemoSecondaryFeature } = require("./DemoFeature");

export function SECTION(label, features) {return {section: true, label, features}}
export function COMPOSITE(parent, features) {return {composite: true, parent, features}}
export function CHOOSEONE(label, features) {return {chooseOne: true, label, features}}

export var features = {
    simplecomments: [
        DemoFeature,
        DemoSecondaryFeature,
        UpvoteFeature,
        LengthLimitFeature,
        DemoModerationFeature,
        DemoFilterFeature,
        BasicTeaserFeature,
        ReplyNotificationsFeature,
    ],
    profile: [
        DemoProfileFeature,
        ProfileCommentsFeature
    ],
    componentdemo: [
        SECTION('Component Sets', [
            DesignSystemDemoFeature,
            CommentDemoFeature,
        ]),
        SECTION('Demo Feature Menu', [
            COMPOSITE(PetSittingFeature, [
                CHOOSEONE('Pet Type', [DogFeature, CatFeature, KomodoDragonFeature]),
                SECTION('Extra Services', [
                    GroomingFeature,
                    WalkingFeature
                ])
            ]),
        ]),
    ]
}

export var defaultFeatureConfig = {
    componentdemo: {
        demo_designsystem: true,
        demo_comment: true
    },
    simplecomments: {
        upvote: true
    },
    profile: {
        profilecomments: true    
    }
}

export function addFeatures(newFeaturesForStructs) {
    Object.keys(newFeaturesForStructs).forEach(structureKey => {
        const oldFeatures = features[structureKey] || [];
        const newFeatures = newFeaturesForStructs[structureKey];
        features[structureKey] = [...oldFeatures, ...newFeatures]
    })
}

export function addDefaultFeatures(newDefaultFeatures) {
    Object.keys(newDefaultFeatures).forEach(structureKey => {
        const newDefaults = newDefaultFeatures[structureKey];
        const oldDefaults = defaultFeatureConfig[structureKey] || {};
        const mergedDefaults = {...oldDefaults, ...newDefaults};
        defaultFeatureConfig[structureKey] = mergedDefaults;
    })
}
