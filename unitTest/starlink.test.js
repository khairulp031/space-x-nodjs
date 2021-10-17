const {
    getStarLink,
    createIndex,
    reduceByDayMonthYear,
    reduceByMonthYear,
    reduceByYear
} = require('../boundedContext/starlink');

jest.setTimeout(10000);

test('test getStarLink', async () => {
    let data = await getStarLink();
    data = JSON.parse(data);
    expect(data.length).toBe(1791);
});

test('test create index', async () => {
    const data = await getStarLink();
    const { ByYear, ByMonthYear, ByDayMonthYear } = createIndex(data);
    expect(Object.keys(ByYear).length).toBe(4);
    expect(Object.keys(ByMonthYear).length).toBe(19);
    expect(Object.keys(ByDayMonthYear).length).toBe(33);
});

test('test create index with empty data', async () => {
    const { ByYear, ByMonthYear, ByDayMonthYear } = createIndex("[]");
    expect(Object.keys(ByYear).length).toBe(0);
    expect(Object.keys(ByMonthYear).length).toBe(0);
    expect(Object.keys(ByDayMonthYear).length).toBe(0);
});

test('test create index with invalid data', async () => {
    const { ByYear, ByMonthYear, ByDayMonthYear } = createIndex("a");
    expect(Object.keys(ByYear).length).toBe(0);
    expect(Object.keys(ByMonthYear).length).toBe(0);
    expect(Object.keys(ByDayMonthYear).length).toBe(0);
});

test('test reduceByDayMonthYear', async () => {
    const array = [{ a: "b", b: "c" }]
    const result = array.reduce(reduceByDayMonthYear, {});
    expect(Object.keys(result).length).toBe(0);
});

test('test reduceByMonthYear', async () => {
    const array = [{ a: "b", b: "c" }]
    const result = array.reduce(reduceByMonthYear, {});
    expect(Object.keys(result).length).toBe(0);
});

test('test reduceByMonthYear', async () => {
    const array = [{ a: "b", b: "c" }]
    const result = array.reduce(reduceByYear, {});
    expect(Object.keys(result).length).toBe(0);
});
