function s(renderItems, n)
{
	function compare(a,b)
	{
		if(a.priority > b.priority)
			return -1;
		if(a.priority < b.priority)
			return 1;
		return 0;
	}
	
	renderItems.sort(compare);
	
	function list_render(renderItems,n,compare)
	{
        let list = [];
        let queue = [];
		for(let i =0;i<renderItems.length;i++)
		{
           
            let result = null;
            if(renderItems[i].children!==null)
			 	result = renderItems[i]['children'];
			if(result !== null)
			{
                console.log( renderItems[i]['children'].length);
				for(let j=0;j<result.length;j++)
                {
                    queue.push(result[j]);
                }
                queue.sort(compare);
			}
            
           
			if(renderItems.length<n && queue.length !== 0)
            {
                console.log(queue);
                for(let j=0;j<queue.length && renderItems.length <n;j++)
                {
                    renderItems.push(queue[j]);
                    queue.splice(0, 1);
                    j--;
                }
                 if(queue.length===0)
                     renderItems.sort(compare);
            }
           
            if(renderItems.length===0)
                return list;
            list.push(renderItems[i].id)
            renderItems.splice(0, 1);
            i--;
		}
        return list;
	}
	let list = [];
	list = list_render(renderItems,n,compare);
	return list;
	
}
  let data = [
    {
      "id": "A",
      "priority": 1,
      "children": [
        {
          "id": "A.1",
          "priority": 2,
          "children": [
            {
              "id": "A.1.1",
              "priority": 2,
              "children": null
            }
          ]
        }
      ]
    },
    {
      "id": "B",
      "priority": 2,
      "children": [
        {
          "id": "B.1",
          "priority": 3,
          "children": null
        },
        {
          "id": "B.2",
          "priority": 3,
          "children": null
        },
        {
          "id": "B.3",
          "priority": 3,
          "children": null
        },
        {
          "id": "B.4",
          "priority": 1,
          "children": null
        },
        {
          "id": "B.5",
          "priority": 1,
          "children": null
        },
        {
          "id": "B.6",
          "priority": 1,
          "children": null
        }
      ]
    }
  ]
console.log(s(data,5));


