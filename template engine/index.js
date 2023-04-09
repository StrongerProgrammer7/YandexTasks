document.addEventListener('DOMContentLoaded', () =>
{
	console.log('load');
})



function solution(entryPoint)
{
	const divs = entryPoint.querySelectorAll('*');

	const copyDiv = [];
	const removeDiv = [];
	const removeChildDIv = [];
	const switchDiv = [];
	
	function getLevel(blocks)
	{
		let obj = blocks;
		let level = 0;
		while(obj.tagName !== 'ENTRY')
		{
			obj = obj.parentNode;
			level++;
		}
		return level;
	}
	
	function height(blocks) 
	{
		let max = 0;
		for(let i = 0;i < blocks.length;i++)
		{
			let level = getLevel(blocks[i]);
			if(level >max )
				max = level;
		}
    
		return max;
	}
	
	function pushDiv(block)
	{
		if(block.hasAttribute('x-make'))
		{
			const action = block.getAttribute('x-make').split(':')[0];
			const number = block.getAttribute('x-make').split(':')[1];
			switch (action)
			{
				case 'copy':					
					copyDiv.push(new Map([[number,block],['level',getLevel(block)]]));
					break;
				case 'remove':
					removeDiv.push(new Map([[number,block],['level',getLevel(block)]]));
					break;
				case 'removeChildren':
					removeChildDIv.push(new Map([[number,block],['level',getLevel(block)]]));
					break;
				case 'switch':
					switchDiv.push(new Map([[number,block],['level',getLevel(block)]]));
					break;
				default:
				break;
			}
		}
	}

	
	function makeAction(action,func,level)
	{
		for(let j = 0; j <action.length;j++)
		{		
			action[j].forEach((block,key) =>
			{
				
				if(key !== 'level' && action[j].get('level')===level)
				{
					//console.log(block);
					func(block,key);
					//console.log(action[j]);
					//console.log(block);
				}else
					return;
					
				
			})
			
		}	
	}
	function copy(block,count)
	{
		let clone_block;
		for(let i=0;i<count;i++)
		{
			block.removeAttribute('x-make');
			clone_block = block.cloneNode(true);
			block.after(clone_block);		
		}
		let new_block = clone_block.querySelectorAll('*');
		for(let i=0;i<new_block.length;i++)
			pushDiv(new_block[i]);
	}
	
	function remove(block,count)
	{
		for(let i=0;i<count;i++)
		{
			if(block.nextElementSibling)
				block.nextElementSibling.remove()
		}
		block.removeAttribute('x-make');
							
	}
	
	function removeChildren(block,count)
	{
		if(block.parentNode !== null && block !== null)
		{
			const childBlock = block.querySelectorAll('*');
			for(let i=0;i<count;i++)
			{
				if(block.firstChild)
					block.removeChild(childBlock[i])
				
			}
			block.removeAttribute('x-make');
		}
					
	}
	
	function switcher(block,count)
	{
		if(block.parentNode !== null && block !== null)
		{
			while(count> 0)
			{
				
				if(block.nextElementSibling)
					block.before(block.nextElementSibling); 
				else
					block.parentNode.insertBefore(block,block.parentNode.firstChild)
				count--; 
			}
					
			block.removeAttribute('x-make');
		}	
	}
	
	
	let maxLevel = height(divs);
	console.log(maxLevel)
	let minLevel = getLevel(entryPoint.querySelectorAll(':scope > *')[0]);
	console.log(minLevel);
	if(divs.length > 0)
		for(let i=0;i<divs.length;i++)
			pushDiv(divs[i]);

	//console.log(copyDiv)
	while(minLevel <= maxLevel)
	{
		makeAction(copyDiv,copy,minLevel);
		makeAction(removeDiv,remove,minLevel);
		makeAction(removeChildDIv,removeChildren,minLevel); 
		makeAction(switchDiv,switcher,minLevel);	
		minLevel++;
	}
	
}


solution(document.querySelector('#en1'))
solution(document.querySelector('#en2'))
solution(document.querySelector('#en3'))
solution(document.querySelector('#en4'))