
// https://stackoverflow.com/questions/34298823/javascript-recursive-implementation-of-integer-partition-without-reaarangement
// https://gist.github.com/k-hamada/8aa85ac9b334fb89ac4f

var integerPartitionRec = function(n, k, S) {
    function sum(p, c) {
        return p + c;
    }

    if (n === 1) return S[1];
    if (k === 1) return S.slice(0, n).reduce(sum);

    var cost, min_cost = Number.MAX_VALUE;
    for (var i = 1; i < n; i++) {
        cost = Math.max(integerPartitionRec(i, k - 1, S), S.slice(i, n).reduce(sum));
        min_cost = Math.min(min_cost, cost);
    }

    return min_cost;
};

var run = function() {
    var test = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    console.log('==>'+integerPartitionRec(test.length, 3, test)); //1700
};

run();