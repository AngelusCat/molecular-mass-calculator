import { ApiResponse } from "../../src/api/ApiResponse";
import { Status } from "../../src/api/Status";

test('ApiResponse.getAll() возвращает правильный объект', () => {
    const apiResponse: ApiResponse = new ApiResponse(Status.SUCCESS, {test: "Test Data"}, "Test ApiResponse", {test: "Test Error"});
    const all = apiResponse.getAll();
    expect(all).toEqual({status: Status.SUCCESS, data: {test: "Test Data"}, message: "Test ApiResponse", errors: {test: "Test Error"}});
});