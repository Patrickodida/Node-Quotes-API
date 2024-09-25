const areaOfAcircle = require("../Utils/some-function");
const { test, expect, describe } = require("@jest/globals");

test("Calculate area of a circle", function(){
    expect(areaOfAcircle(2)).toBe(12);
})