/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask RecycleBot for a recycling fact"
 *  Alexa: "Here's your recycling fact: ..."
 * Source: http://bgm.stanford.edu/pssi_faq_benefits
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "A ton of soda cans made with recycled aluminum saves an amazing 21,000 kilowatt hours by reducing the virgin bauxite (bozite) ore that would have to be mined, shipped, and refined. That’s a 95% energy savings.",
    "The average person has the opportunity to recycle more than 25,000 cans in a lifetime.",
    "Recycling a single aluminum can saves enough energy to power a TV for three hours.",
    "The Steel Recycling Institute has found that steel recycling saves enough energy to electrically power the equilvalent of 18 million homes for a year.",
    "With all the energy that is saved when we recycle bottles and cans and paper, we should all recycle and buy recycled more often!",
    "Recycling of aluminum cans saves 95% of the energy required to make the same amount of aluminum from its virgin source. One ton of recycled aluminum saves 14,000 kilowatt hours (Kwh) of energy, 40 barrels of oil, 238 million Btu's of energy, and 10 cubic yards of landfill space.",
    "One ton of recycled newsprint saves 601 Kwh of energy, 1.7 barrels of oil (71 gallons), 10.2 million Btu's of energy, 60 pounds of air pollutants from being released, 7,000 gallons of water, and 4.6 cubic yards of landfill space.",
    "One ton of recycled office paper saves 4,100 Kwh of energy, 9 barrels of oil, 54 million Btu's of energy, 60 pounds of air pollutants from being released, 7,000 gallons of water, and 3.3 cubic yards of landfill space.",
    "One ton of recycled plastic saves 5,774 Kwh of energy, 16.3 barrels of oil, 98 million Btu's of energy, and 30 cubic yards of landfill space.",
    "One ton of recycled steel saves 642 Kwh of energy, 1.8 barrels of oil, 10.9 million Btu's of energy, and 4 cubic yards of landfill space.",
    "One ton of recycled glass saves 42 Kwh of energy, 0.12 barrels of oil (5 gallons), 714,000 Btu's of energy, 7.5 pounds of air pollutants from being released, and 2 cubic yards of landfill space. Over 30% of the raw material used in glass production now comes from recycled glass.",
    "Before the 1920s, 70% of U.S. cities ran programs to recycle certain materials. During World War II, industry recycled and reused about 25% of the waste stream. Because of concern for the environment, recycling is again on the upswing. The nation's composting and recycling rate rose from 7.7% of the waste stream in 1960 to 17% in 1990. It's currently up to around 30%. California is at about 48%.",
    "The average American discards seven and a half pounds of garbage every day. This garbage, the solid waste stream, goes mostly to landfills, where it's compacted and buried. As the waste stream continues to grow, so will the pressures on our landfills, our resources, and our environment."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

