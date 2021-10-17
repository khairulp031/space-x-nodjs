const { getFailedLaunches } = require('../boundedContext/launchpads');
const retval = { "launchpad": "Kwajalein Atoll", "all_failures": [{ "failures": ["merlin engine failure"], "name": "FalconSat" }, { "failures": ["harmonic oscillation leading to premature engine shutdown"], "name": "DemoSat" }, { "failures": ["residual stage-1 thrust led to collision between stage 1 and stage 2"], "name": "Trailblazer" }] };

jest.setTimeout(10000);

test('test valid id', async () => {
    let data = await getFailedLaunches('5e9e4502f5090995de566f86');
    expect(data.launchpad).toStrictEqual("Kwajalein Atoll");
    expect(data.all_failures.length).toBe(3);
    expect(data).toStrictEqual(retval);
});

test('test without id', async () => {
    let data = await getFailedLaunches();
    expect(data).toStrictEqual('"id" is required argument');
});

test('test invalid id', async () => {
    let input = '&'
    let data = await getFailedLaunches(input);
    expect(data).toStrictEqual(`Cast to ObjectId failed for value "${input}" (type string) at path "_id" for model "Launchpad"`);

    input = '1'
    data = await getFailedLaunches(input);
    expect(data).toStrictEqual(`Cast to ObjectId failed for value "${input}" (type string) at path "_id" for model "Launchpad"`);

    input = 'a'
    data = await getFailedLaunches(input);
    expect(data).toStrictEqual(`Cast to ObjectId failed for value "${input}" (type string) at path "_id" for model "Launchpad"`);

    input = '5e9e4502f5090995de566f8'
    data = await getFailedLaunches(input);
    expect(data).toStrictEqual(`Cast to ObjectId failed for value "${input}" (type string) at path "_id" for model "Launchpad"`);

    input = '5e9e4502f5090995de566f86a'
    data = await getFailedLaunches(input);
    expect(data).toStrictEqual(`Cast to ObjectId failed for value "${input}" (type string) at path "_id" for model "Launchpad"`);

    input = '5e9e4502f5090995de566f8a'
    data = await getFailedLaunches(input);
    expect(data.totalDocs).toBe(0);

});