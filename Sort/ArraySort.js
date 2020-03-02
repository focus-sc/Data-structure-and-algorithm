//线性表排序算法
//默认升序
//冒泡排序 O(n2) 稳定
let bubbleSort = function(array){
	let length = array.length;
	for(let i = 0; i < length; i++){
		for(let j = 0; j < length - i - 1; j++){
			if(array[j] > array[j+1]){
				[array[j], array[j+1]] = [array[j+1], array[j]];
			}
		}
	}
};

//选择排序 O(n2) 不稳定
let selectionSort = function(array){
	let length = array.length;
	for(let i = 0; i < length - 1; i++){
		let minIndex = i;
		for(let j = i + 1; j < length; j++){
			minIndex = array[minIndex] > array[j] ? j : minIndex;
		}
		[array[i], array[minIndex]] = [array[minIndex], array[i]];
	}
};

//插入排序 O(n2) 稳定
let insertSort = function(array){
	let length = array.length;
	for(let i = 1; i < length; i++){
		for(let j = i - 1; j >= 0 && array[j+1] < array[j]; j--){
			[array[j], array[j+1]] = [array[j+1], array[j]];
		}
	}
};

//希尔排序 O(n1.3) - O(n2) 不稳定
let shellSort = function(array){
	let length = array.length;
	for(let dk = Math.floor(length/2); dk >= 1; dk = Math.floor(dk/2)){
		for(let i = dk; i < length; i++){
			if(array[i] < array[i-dk]){
				let temp = array[i], j = i-dk;
				while(j>=0 && temp < array[j]){
					array[j+dk] = array[j];
					j-=dk;
				}
				array[j+dk] = temp;
			}
		}
	}
}

//归并排序 O(nlogn) 稳定
let mergeSort = function(array){
	if(array.length < 2){
		return array.slice();
	}
	let merge = function(left, right){
		let i = 0, j = 0, result = [];
		while(i < left.length && j < right.length){
			if(left[i] <= right[j]){
				result.push(left[i]);
				i++;
			}else{
				result.push(right[j]);
				j++;
			}
		}
		return result.concat(i < left.length ? left.slice(i) : right.slice(j));
	};
	let split = function(start, end){
		if(start == end){
			return [array[start]];
		}
		let mid = Math.floor((start+end)/2),
			left = split(start, mid),
			right = split(mid+1, end);
		return merge(left, right);
	};
	let res = split(0, array.length-1);
	return res;
};

//快速排序  O(nlogn)- O(n2) 不稳定
let quickSort = function(array){
	if(array.length < 2){
		return array;
	}
	let partition = function(low, high){
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
	let sort = function(low, high){
		if(low < high){
			let pivotloc = partition(low, high);
			sort(low, pivotloc-1);
			sort(pivotloc+1, high);
		}
	}
	sort(0, array.length-1);
};


//堆排序 O(nlogn) 不稳定
let heapSort = function(array,k){
	let length = array.length;
	let heapAdjust = function(cur, end){
		let top = array[cur];
		for(let i = cur*2+1; i <= end; i = i*2+1){
			if(i < end && array[i] < array[i+1]){
				i++;
			}
			if(top >= array[i]) break;
			[array[cur],cur] = [array[i],i];
		}
		array[cur] = top;
	}
	let sort = (function(k){
		k = k === undefined ? length -1 : k;
		for(let i = Math.floor(length/2)-1; i>=0; i--){
			heapAdjust(i, length-1);
		}
		for(let i = length-1; i > length-1-k && i >=0 ; i--){
			[array[i],array[0]] = [array[0],array[i]];
			heapAdjust(0, i-1);
		}
	})(k);
};

//桶排序 O(kn) 不稳定
let bucketSort = function(array, size = 10){
	let length = array.length,
		count = 0,
		max = Math.max(...array),
		min = Math.min(...array),
		bucketCount = Math.floor((max-min)/size)+1,
		buckets = new Array(bucketCount).fill(0);

	buckets.forEach((value,index,array)=>{array[index] = [];});
	for(let i = 0; i < length; i++){
		let index = Math.floor((array[i]-min)/size);
		buckets[index].push(array[i]);
	}
    for(let i = 0; i < bucketCount; i++){
		quickSort(buckets[i]);
	}
	return buckets.flat();
};

//基数排序 O(d(n+r)) 稳定
let radixSort = function(array, radix=10){
	let length = array.length,
		max = Math.max(...array),
		k = String(max).length;

	for(let i = 1; i <= k; i++){
		let buckets = new Array(radix).fill(0); 
		buckets.forEach((value,index,array)=>{array[index] = [];});
		for(let j = 0; j < length; j++){
			let index = Math.floor(array[j] % (radix ** i) / (radix**(i-1)));
			buckets[index].push(array[j]);
		}
		
		let count = 0;
		buckets.forEach((value)=>{value.forEach((num)=>{array[count++] = num})});
	}
};