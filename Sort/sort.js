//排序算法

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

//堆排序
//大顶堆 升序排序
let heapAdjust = function(array, s, m){
    let temp = array[s];
    for(let i = s*2+1; i <= m; i = i*2+1){
        if(i < m && array[i] < array[i+1]){
            i++;
        }
        if(temp >= array[i]) break;
        [array[s],s] = [array[i],i];
    }
    array[s] = temp;
}
let heapSort = function(array,k){
	let len =  array.length;
	k = k === undefined ? len -1 : k;
    for(let i = Math.floor(len/2)-1; i>=0; i--){
        heapAdjust(array, i, len-1);
    }
    for(let i = len-1; i > len-1-k && i >=0 ; i--){
        [array[i],array[0]] = [array[0],array[i]];
        heapAdjust(array, 0, i-1);
    }
}
