function arrayDiff (arr1, arr2) {
  arr1.sort();
  arr2.sort();

  var array1 = JSON.stringify(arr1);
  var array2 = JSON.stringify(arr2)
  return array1 === array2;
}

export default { arrayDiff };

