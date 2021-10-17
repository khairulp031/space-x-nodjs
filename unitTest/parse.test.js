const { cleaningInput, padWithZeroes, getDateInput, parse } = require('../boundedContext/parse');

test('test valid parse', async () => {
    let data = parse('2019');
    expect(data).toBe('2019');

    data = parse('      2019     ');
    expect(data).toBe('2019');

    data = parse(2019);
    expect(data).toBe('2019');

    data = parse('May 2019');
    expect(data).toBe('2019-05');

    data = parse('     May                2019     ');
    expect(data).toBe('2019-05');

    data = parse('   May            1st          2019   ');
    expect(data).toBe('2019-05-01');

    data = parse('May 1st 2019');
    expect(data).toBe('2019-05-01');

    data = parse('May 2nd 2019');
    expect(data).toBe('2019-05-02');

    data = parse('May 3rd 2019');
    expect(data).toBe('2019-05-03');

    data = parse('May 4th 2019');
    expect(data).toBe('2019-05-04');

    data = parse('Jan 31st 2019');
    expect(data).toBe('2019-01-31');

    data = parse('Jan 11th 2021');
    expect(data).toBe('2021-01-11');

    data = parse('2021-11-1');
    expect(data).toBe('2021-11-01');

    data = parse('2021-5-30');
    expect(data).toBe('2021-05-30');

    data = parse('May-2021');
    expect(data).toBe('2021-05');

    data = parse('q');
    expect(data).toBe('q');

    data = parse('Q');
    expect(data).toBe('Q');

    data = parse('e');
    expect(data).toBe('e');

    data = parse('Quit');
    expect(data).toBe('Quit');

    data = parse('quit');
    expect(data).toBe('quit');

    data = parse('Exit');
    expect(data).toBe('Exit');

    data = parse('exit');
    expect(data).toBe('exit');
});


test('test invalid parse', async () => {
    data = parse('Khairul');
    expect(data).toBe('');

    data = parse('11-2021');
    expect(data).toBe('');

    data = parse('');
    expect(data).toBe('');

    data = parse(undefined);
    expect(data).toBe('');

    data = parse(false);
    expect(data).toBe('');

    data = parse(true);
    expect(data).toBe('');


    data = parse("                   ");
    expect(data).toBe('');

    data = parse("      a    d    d    e    d    d             ");
    expect(data).toBe('');    
});