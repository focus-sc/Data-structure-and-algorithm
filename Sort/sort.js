//各种排序算法
//快速排序
let partition = function(array, low, high){
	let pivotkey = array[low];
	while(low < high){
		while(low < high && array[high] >= pivotkey){
			high--;
		}
		array[low] = array[high];
		while(low < high && array[low] <= pivotkey){
			low++;
		}
		array[high] = array[low];
	}
	array[low] = pivotkey;
	return low;
}
let quickSort = function(array, low, high){
	if(low < high){
		let pivotloc = partition(array, low, high);
		quickSort(array, low, pivotloc - 1);
		quickSort(array, pivotloc +1, high);
	}
}
