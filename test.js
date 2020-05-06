import test from 'ava';
import prettyMilliseconds from '.';

test('prettify milliseconds', t => {
	t.is(prettyMilliseconds(0), '0 Milisaniye');
	t.is(prettyMilliseconds(0.1), '10 Milisaniye');
	t.is(prettyMilliseconds(1), '10 Milisaniye');
	t.is(prettyMilliseconds(999), '9990 Milisaniye');
	t.is(prettyMilliseconds(1000), '1 Saniye');
	t.is(prettyMilliseconds(1000 + 400), '1.4 Saniye');
	t.is(prettyMilliseconds((1000 * 2) + 400), '2.4 Saniye');
	t.is(prettyMilliseconds(1000 * 55), '55 Saniye');
	t.is(prettyMilliseconds(1000 * 67), '1 Dakika 7 Saniye');
	t.is(prettyMilliseconds(1000 * 60 * 5), '5 Daika');
	t.is(prettyMilliseconds(1000 * 60 * 67), '1 Saat 7 Dakika');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 12), '12 Saat');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 40), '1 Gün 16 Saat');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 999), '41 Gün 15 Saat');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 24 * 465), '1 Yıl 100 Gün');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465), '1 Yıl 154 Gün 6 Saat');
	t.is(prettyMilliseconds(119999), '1 Dakika 59.9 Saniye');
	t.is(prettyMilliseconds(120000), '2 Dakika');
});

test('have a compact option', t => {
	t.is(prettyMilliseconds(1000 + 4, {compact: true}), '1 Saniye');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 999, {compact: true}), '41 Gün');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 24 * 465, {compact: true}), '1 Yıl');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {compact: true}), '1 Yıl');
});

test('have a unitCount option', t => {
	t.is(prettyMilliseconds(1000 * 60, {unitCount: 0}), '1 Dakika');
	t.is(prettyMilliseconds(1000 * 60, {unitCount: 1}), '1 Dakika');
	t.is(prettyMilliseconds(1000 * 60 * 67, {unitCount: 1}), '1 Saat');
	t.is(prettyMilliseconds(1000 * 60 * 67, {unitCount: 2}), '1 Saat 7 Dakika');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 1}), '1 Yıl');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 2}), '1 Yıl 154 Gün');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 3}), '1 Yıl 154 Gün 6 Saat');
});

test('have a secondsDecimalDigits option', t => {
	t.is(prettyMilliseconds(10000), '10 Saniye');
	t.is(prettyMilliseconds(33333), '33.3 Saniye');
	t.is(prettyMilliseconds(999, {secondsDecimalDigits: 0}), '999 Milisaniye');
	t.is(prettyMilliseconds(1000, {secondsDecimalDigits: 0}), '1 Saniye');
	t.is(prettyMilliseconds(1999, {secondsDecimalDigits: 0}), '1 Saniye');
	t.is(prettyMilliseconds(2000, {secondsDecimalDigits: 0}), '2 Saniye');
	t.is(prettyMilliseconds(33333, {secondsDecimalDigits: 0}), '33 Saniye');
	t.is(prettyMilliseconds(33333, {secondsDecimalDigits: 4}), '33.3330 Saniye');
});

test('have a millisecondsDecimalDigits option', t => {
	t.is(prettyMilliseconds(33.333), '33 Milisaniye');
	t.is(prettyMilliseconds(33.333, {millisecondsDecimalDigits: 0}), '33 Milisaniye');
	t.is(prettyMilliseconds(33.333, {millisecondsDecimalDigits: 4}), '33.3330 Milisaniye');
});

test('have a keepDecimalsOnWholeSeconds option', t => {
	t.is(prettyMilliseconds(1000 * 33, {secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true}), '33.00 Saniye');
	t.is(prettyMilliseconds(1000 * 33.00004, {secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true}), '33.00 Saniye');
});

test('have a verbose option', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {verbose: true});

	t.is(fn(0), '0 Mili Saniye');
	t.is(fn(0.1), '1 Mili Saniye');
	t.is(fn(1), '1 Mili Saniye');
	t.is(fn(1000), '1 Saniye');
	t.is(fn(1000 + 400), '1.4 Saniye');
	t.is(fn((1000 * 2) + 400), '2.4 Saniye');
	t.is(fn(1000 * 5), '5 Saniye');
	t.is(fn(1000 * 55), '55 Saniye');
	t.is(fn(1000 * 67), '1 Dakika 7 Saniye');
	t.is(fn(1000 * 60 * 5), '5 Dakika');
	t.is(fn(1000 * 60 * 67), '1 Saat 7 Dakika');
	t.is(fn(1000 * 60 * 60 * 12), '12 Saat');
	t.is(fn(1000 * 60 * 60 * 40), '1 Gün 16 Saat');
	t.is(fn(1000 * 60 * 60 * 999), '41 Gün 15 Saat');
	t.is(fn(1000 * 60 * 60 * 24 * 465), '1 Yıl 100 Gün');
	t.is(fn(1000 * 60 * 67 * 24 * 465), '1 Yıl 154 Gün 6 Saat');
});

test('have a separateMilliseconds option', t => {
	t.is(prettyMilliseconds(1100, {separateMilliseconds: false}), '1.1 Saniye');
	t.is(prettyMilliseconds(1100, {separateMilliseconds: true}), '1s 100 Milisaniye');
});

test('have a formatSubMilliseconds option', t => {
	t.is(prettyMilliseconds(0.4, {formatSubMilliseconds: true}), '400µs');
	t.is(prettyMilliseconds(0.123571, {formatSubMilliseconds: true}), '123µs 571ns');
	t.is(prettyMilliseconds(0.123456789, {formatSubMilliseconds: true}), '123µs 456ns');
	t.is(
		prettyMilliseconds((60 * 60 * 1000) + (23 * 1000) + 433 + 0.123456, {
			formatSubMilliseconds: true
		}),
		'1h 23s 433ms 123µs 456ns'
	);
});

test('work with verbose and compact options', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {
		verbose: true,
		compact: true
	});

	t.is(fn(1000), '1 Saniye');
	t.is(fn(1000 + 400), '1 Saniye');
	t.is(fn((1000 * 2) + 400), '2 Saniye');
	t.is(fn(1000 * 5), '5 Saniye');
	t.is(fn(1000 * 55), '55 Saniye');
	t.is(fn(1000 * 67), '1 Dakika');
	t.is(fn(1000 * 60 * 5), '5 Dakika');
	t.is(fn(1000 * 60 * 67), '1 Saat');
	t.is(fn(1000 * 60 * 60 * 12), '12 Saat');
	t.is(fn(1000 * 60 * 60 * 40), '1 Gün');
	t.is(fn(1000 * 60 * 60 * 999), '41 Gün');
	t.is(fn(1000 * 60 * 60 * 24 * 465), '1 Yıl');
	t.is(fn(1000 * 60 * 67 * 24 * 750), '2 Yıl');
});

test('work with verbose and unitCount options', t => {
	t.is(prettyMilliseconds(1000 * 60, {verbose: true, unitCount: 1}), '1 Dakika');
	t.is(prettyMilliseconds(1000 * 60 * 67, {verbose: true, unitCount: 1}), '1 Saat');
	t.is(prettyMilliseconds(1000 * 60 * 67, {verbose: true, unitCount: 2}), '1 Saat 7 Dakika');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 1}), '1 Yıl');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 2}), '1 Yıl 154 Gün');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 3}), '1 Yıl 154 Gün 6 Saat');
});

test('work with verbose and secondsDecimalDigits options', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {
		verbose: true,
		secondsDecimalDigits: 4
	});

	t.is(fn(1000), '1 Saniye');
	t.is(fn(1000 + 400), '1.4000 Saniye');
	t.is(fn((1000 * 2) + 400), '2.4000 Saniye');
	t.is(fn((1000 * 5) + 254), '5.2540 Saniye');
	t.is(fn(33333), '33.3330 Saniye');
});

test('work with verbose and millisecondsDecimalDigits options', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {
		verbose: true,
		millisecondsDecimalDigits: 4
	});

	t.is(fn(1), '1.0000 Mili Saniye');
	t.is(fn(1 + 0.4), '1.4000 Mili Saniye');
	t.is(fn((1 * 2) + 0.4), '2.4000 Mili Saniye');
	t.is(fn((1 * 5) + 0.254), '5.2540 Mili Saniye');
	t.is(fn(33.333), '33.3330 Mili Saniye');
});

test('work with verbose and formatSubMilliseconds options', t => {
	t.is(
		prettyMilliseconds(0.4, {formatSubMilliseconds: true, verbose: true}),
		'400 microseconds'
	);
	t.is(
		prettyMilliseconds(0.123571, {
			formatSubMilliseconds: true,
			verbose: true
		}),
		'123 microseconds 571 nanoseconds'
	);
	t.is(
		prettyMilliseconds(0.123456789, {
			formatSubMilliseconds: true,
			verbose: true
		}),
		'123 microseconds 456 nanoseconds'
	);
	t.is(
		prettyMilliseconds(0.001, {formatSubMilliseconds: true, verbose: true}),
		'1 microsecond'
	);
});

test('compact option overrides unitCount option', t => {
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, compact: true, unitCount: 1}), '1 Yıl');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, compact: true, unitCount: 2}), '1 Yıl');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, compact: true, unitCount: 3}), '1 Yıl');
});

test('work with separateMilliseconds and formatSubMilliseconds options', t => {
	t.is(
		prettyMilliseconds(1010.340067, {
			separateMilliseconds: true,
			formatSubMilliseconds: true
		}),
		'1s 10ms 340µs 67ns'
	);
	t.is(
		prettyMilliseconds((60 * 1000) + 34 + 0.000005, {
			separateMilliseconds: true,
			formatSubMilliseconds: true
		}),
		'1m 34ms 5ns'
	);
});

test('throw on invalid', t => {
	t.throws(() => {
		prettyMilliseconds('foo');
	});

	t.throws(() => {
		prettyMilliseconds(Number.NaN);
	});

	t.throws(() => {
		prettyMilliseconds(Infinity);
	});
});

test('properly rounds milliseconds with secondsDecimalDigits', t => {
	const fn = milliseconds =>
		prettyMilliseconds(milliseconds, {
			verbose: true,
			secondsDecimalDigits: 0
		});
	t.is(fn(3 * 60 * 1000), '3 Dakika');
	t.is(fn((3 * 60 * 1000) - 1), '2 Dakika 59 Saniye');
	t.is(fn(365 * 24 * 3600 * 1e3), '1 Yıl');
	t.is(fn((365 * 24 * 3600 * 1e3) - 1), '364 Gün 23 Saat 59 Dakika 59 Saniye');
	t.is(fn(24 * 3600 * 1e3), '1 Gün');
	t.is(fn((24 * 3600 * 1e3) - 1), '23 Saat 59 Dakika 59 Saniye');
	t.is(fn(3600 * 1e3), '1 Saat');
	t.is(fn((3600 * 1e3) - 1), '59 Dakika 59 Saniye');
	t.is(fn(2 * 3600 * 1e3), '2 Saat');
	t.is(fn((2 * 3600 * 1e3) - 1), '1 Saat 59 Dakika 59 Saniye');
});

test('`colonNotation` option', t => {
	// Default formats
	t.is(prettyMilliseconds(1000, {colonNotation: true}), '0:01');
	t.is(prettyMilliseconds(1543, {colonNotation: true}), '0:01.5');
	t.is(prettyMilliseconds(1000 * 60, {colonNotation: true}), '1:00');
	t.is(prettyMilliseconds(1000 * 90, {colonNotation: true}), '1:30');
	t.is(prettyMilliseconds(95543, {colonNotation: true}), '1:35.5');
	t.is(prettyMilliseconds((1000 * 60 * 10) + 543, {colonNotation: true}), '10:00.5');
	t.is(prettyMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true}), '59:59.5');
	t.is(prettyMilliseconds((1000 * 60 * 60 * 15) + (1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true}), '15:59:59.5');

	// Together with `secondsDecimalDigits`
	t.is(prettyMilliseconds(1543, {colonNotation: true, secondsDecimalDigits: 0}), '0:01');
	t.is(prettyMilliseconds(1543, {colonNotation: true, secondsDecimalDigits: 1}), '0:01.5');
	t.is(prettyMilliseconds(1543, {colonNotation: true, secondsDecimalDigits: 2}), '0:01.54');
	t.is(prettyMilliseconds(1543, {colonNotation: true, secondsDecimalDigits: 3}), '0:01.543');
	t.is(prettyMilliseconds(95543, {colonNotation: true, secondsDecimalDigits: 0}), '1:35');
	t.is(prettyMilliseconds(95543, {colonNotation: true, secondsDecimalDigits: 1}), '1:35.5');
	t.is(prettyMilliseconds(95543, {colonNotation: true, secondsDecimalDigits: 2}), '1:35.54');
	t.is(prettyMilliseconds(95543, {colonNotation: true, secondsDecimalDigits: 3}), '1:35.543');
	t.is(prettyMilliseconds((1000 * 60 * 10) + 543, {colonNotation: true, secondsDecimalDigits: 3}), '10:00.543');
	t.is(prettyMilliseconds((1000 * 60 * 60 * 15) + (1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true, secondsDecimalDigits: 3}), '15:59:59.543');

	// Together with `keepDecimalsOnWholeSeconds`
	t.is(prettyMilliseconds(1000, {colonNotation: true, keepDecimalsOnWholeSeconds: true}), '0:01.0');
	t.is(prettyMilliseconds(1000, {colonNotation: true, secondsDecimalDigits: 0, keepDecimalsOnWholeSeconds: true}), '0:01');
	t.is(prettyMilliseconds(1000, {colonNotation: true, secondsDecimalDigits: 1, keepDecimalsOnWholeSeconds: true}), '0:01.0');
	t.is(prettyMilliseconds(1000, {colonNotation: true, secondsDecimalDigits: 3, keepDecimalsOnWholeSeconds: true}), '0:01.000');
	t.is(prettyMilliseconds(1000 * 90, {colonNotation: true, keepDecimalsOnWholeSeconds: true}), '1:30.0');
	t.is(prettyMilliseconds(1000 * 90, {colonNotation: true, secondsDecimalDigits: 3, keepDecimalsOnWholeSeconds: true}), '1:30.000');
	t.is(prettyMilliseconds(1000 * 60 * 10, {colonNotation: true, secondsDecimalDigits: 3, keepDecimalsOnWholeSeconds: true}), '10:00.000');

	// Together with `unitCount`
	t.is(prettyMilliseconds(1000 * 90, {colonNotation: true, secondsDecimalDigits: 0, unitCount: 1}), '1');
	t.is(prettyMilliseconds(1000 * 90, {colonNotation: true, secondsDecimalDigits: 0, unitCount: 2}), '1:30');
	t.is(prettyMilliseconds(1000 * 60 * 90, {colonNotation: true, secondsDecimalDigits: 0, unitCount: 3}), '1:30:00');
	t.is(prettyMilliseconds(95543, {colonNotation: true, secondsDecimalDigits: 1, unitCount: 1}), '1');
	t.is(prettyMilliseconds(95543, {colonNotation: true, secondsDecimalDigits: 1, unitCount: 2}), '1:35.5');
	t.is(prettyMilliseconds(95543 + (1000 * 60 * 60), {colonNotation: true, secondsDecimalDigits: 1, unitCount: 3}), '1:01:35.5');

	// Make sure incompatible options fall back to `colonNotation`
	t.is(prettyMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true, formatSubMilliseconds: true}), '59:59.5');
	t.is(prettyMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true, separateMilliseconds: true}), '59:59.5');
	t.is(prettyMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true, verbose: true}), '59:59.5');
	t.is(prettyMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, {colonNotation: true, compact: true}), '59:59.5');
});
