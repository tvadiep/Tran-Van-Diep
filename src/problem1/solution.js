/**
 * HERE ARE THE SOLUTIONS FOR THE PROBLEM 1 OF FE CODING CHALLENGE
 *
 * My assumption is that the  sum will be
 *
 * EXPLANATION:
 * Approach 1:
 *  I use the simplest approach: a for loop from 1 to n accumulatively and store result in a variable `sum`.
 * Approach 2:
 *  I use a better looking approach: a recursion to return the previous sum plus the current value.
 * Approach 3:
 *  I use the formula to compute directly so this approach will have the complexity of O(1). It will run faster than the other two approach.
 */

console.log("THE SAMPLE INPUT IS: 10");

var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
console.log("The result of approach 1 is: ", sum_to_n_a(10));

var sum_to_n_b = function (n) {
  if (n <= 0) return 0;
  return sum_to_n_a(n - 1) + n;
};

console.log("The result of approach 2 is: ", sum_to_n_b(10));

var sum_to_n_c = function (n) {
  if (n < 0) return 0;
  return (n * (n + 1)) / 2;
};

console.log("The result of approach 3 is: ", sum_to_n_c(10));
