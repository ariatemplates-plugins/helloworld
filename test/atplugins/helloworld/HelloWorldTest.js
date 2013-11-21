/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Aria.classDefinition({
    $classpath : "test.atplugins.helloworld.HelloWorldTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom", "aria.utils.FireDomEvent", "aria.core.Browser", "aria.touch.Event"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.setTestEnv({
            template : "test.atplugins.helloworld.HelloWorldTestTpl"
        });
        this.domUtil = aria.utils.Dom;
        this.fireEvent = aria.utils.FireDomEvent;
        this.target = null;
        this.touchEventMap = aria.touch.Event.touchEventMap;
    },
    $destructor : function () {
        this.domUtil = null;
        this.fireEvent = null;
        this.target = null;
        this.touchEventMap = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        /**
         * Start the template test suite .
         */
        runTemplateTest : function () {
            this.target = this.domUtil.getElementById("target").children[0].children[0].children[1];
            this._delay(10, this._testStyle, {"iteration": 0, "callback" : this._testFirstTap});
        },
        /**
         * Test a first tap
         */
        _testFirstTap : function () {
            this._raiseFakeEvent(this.touchEventMap.touchstart, {});
            this._raiseFakeEvent(this.touchEventMap.touchend, {});
            this._delay(10, this._testStyle, {"iteration": 1, "callback" : this._testSecondTap});
        },
        /**
         * Test a second tap
         */
        _testSecondTap : function () {
            this._raiseFakeEvent(this.touchEventMap.touchstart, {});
            this._raiseFakeEvent(this.touchEventMap.touchend, {});
            this._delay(10, this._testStyle, {"iteration": 2, "callback" : this._testThirdTap});
        },
        /**
         * Test a third tap
         */
        _testThirdTap : function () {
            this._raiseFakeEvent(this.touchEventMap.touchstart, {});
            this._raiseFakeEvent(this.touchEventMap.touchend, {});
            this._delay(10, this._testStyle, {"iteration": 3, "callback" : this._endTests});
        },
        /**
         * Utility to raise fake events.
         * @param {String} eventName
         */
        _raiseFakeEvent : function (eventName, options) {
            this.fireEvent.fireEvent(eventName, this.target, options);
        },
        /**
         * Utility to add delay.
         * @param {Number} delay
         * @param {Object} callback
         * @param {Object} args
         */
        _delay : function (delay, callback, args) {
            var callback = (callback) ? callback : args.callback;
            aria.core.Timer.addCallback({
                fn : callback,
                scope : this,
                delay : delay,
                args : args
            });
        },
        /**
         * Utility to test a sequence of events.
         * @param {Object} args
         */
        _testStyle : function (args) {
            this.target = this.domUtil.getElementById("target").children[0].children[0].children[1];
            var message = this.domUtil.getElementById("target").children[0].children[0].children[0];
            this.assertEquals(message.style.fontSize, (10 + (args.iteration * 5)) + "px", "Wrong font-size for the message, found \"" + message.style.fontSize + "\" instead of \"" + (10 + (args.iteration * 5))+ "px\"");
            this._delay(10, null, args);
        },
        /**
         * Wrapper to end the tests.
         */
        _endTests : function () {
            this._delay(10, this.end, {});
        }
    }
});