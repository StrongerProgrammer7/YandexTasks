function layout(blocks) 
{
  // Sort blocks by height in descending order
  //blocks.sort((a, b) => b.form.length - a.form.length);
	let totalHeight = 0;
	for(const block of blocks)
	{
		if(block.form.length > totalHeight)
			totalHeight = block.form.length;
	}
  // Initialize grid as empty
  let grid = Array.from({ length: totalHeight }, () => []);

  // Fill grid row by row from top to bottom

  for(let block of blocks)
  {
	  block.form = clearGrid(block.form);
	 	
  }
  const result = [];
  let num = 0;
  let pos = 1;
  let bl=-1;
  let gridTemp;
  while(blocks.length!==0)//const block of blocks) 
  {
	  bl++;
	  if(bl>=blocks.length)
		  bl--;
	  let form = blocks[bl].form;
	  let idBlock = blocks[bl].id;
	  if(num===0)
	  {
		  result.push({ blockId: idBlock, position: pos, isRotated: false});
		  num++;
		  for (let k = 0; k < form.length; k++) 
            {
              for (let l = 0; l < form[k].length; l++) 
              {
                if (form[k][l] === 1) {
                  grid[k][l] = idBlock;
                }else
					grid[k][l] = 0;
              }
            }
			blocks.splice(0,1);
			bl--;
		  continue;
	  }
    // Try all possible rotations of the block
    
	
	let resultPUSH = false;
    let rowFound = false;
    for (let i = 0; i < 1; i++) 
    {
	  
      for (let j = 0; j < 1; j++) 
      {
        // Find the first row of the grid that can accommodate the block
        let x = 0;
        
        while (x <= grid.length - form.length && !rowFound) 
        {
          // Check if the block can fit in the current row
          let canFit = checkGrid(grid,form);
		  let rotateGr = false;
		  let rotateFomr = false;
		  if(canFit === false)
		  {
			  if(result.length>1)
			  {
				   grid = rotate(rotate(grid));
					canFit = checkGrid(grid,form);
					rotateGr = true;
					if(canFit===true)
						pos++;
			  }
			 
			  if(canFit === false)
			  {
			  	form = rotate(rotate(form));
			  	canFit = checkGrid(grid,form);
				rotateFomr = true;
			  	if(canFit===false)
				{
					if(result.length > 1)
						grid = rotate(rotate(grid));
					canFit = checkGrid(grid,form);
				
				}
			  }
			  
			
		  }
		  if(rotateGr===true)
		  {
			  result[result.length-1].isRotated = rotateGr;
			  if(result[result.length-1].position !== pos)
			  {
				  result[result.length-1].position = pos;
				  pos--;
			  }
				
		  }
		  
          // for (let k = 0; k < form.length && canFit; k++) 
          // {
            // for (let l = 0; l < form[k].length && canFit; l++)
            // {
              // if (form[k][l] === 1 && grid[x + k][l] !== 0) 
              // {
				  // if(grid[x + k][l] !== undefined)
					// canFit = false;
              // }
            // }
          // }
          if (canFit) 
          {
            // Place the block in the current row
			grid = gridClearRow(grid);
			form = clearFormRow(form);
            for (let k = 0; k < form.length; k++) 
            {
              for (let l = 0; l < form[k].length; l++) 
              {
                if (form[k][l] === 1)
				{
					if(!grid[x + k][l])
						grid[x + k][l] = blocks[bl].id;
                }else
				{
					if(!grid[x + k][l])
						grid[x + k][l] = 0;
				}
					
              }
            }
			grid = clearGrid(grid);
			pos++;
            result.push({ blockId: idBlock, position:pos, isRotated: rotateFomr/*i === 1 || j % 2 === 1*/ });
			
			blocks.splice(bl,1);
			bl--;
            rowFound = true;
            break;
          }
          x++;
        }
        if (rowFound) 
        {
          break;
        }
        // Rotate the block by 90 degrees
        form = rotate(rotate(form));
      }
      // Flip the block
      form = flip(form);
    }
  }

  return result;
}
function lastRowGrid(grid)
{
	let last = 0;
	for(let i=0;i<grid.length;i++)
	{
		if(grid[i].length!=0)
			last=i;
	}
	return last;
}
function checkGrid(grid,form)
{
	let canFit = true;
	let lastRow = lastRowGrid(grid);
	for(let k=0;k<grid[lastRow].length && canFit;k++)
	{ 
		// for(let m =0;m<form[0].length && canFit;m++)
		// {
			if (form[0][k] === 1 && grid[lastRow][k] !== 0) 
			{
			  if(grid[lastRow][k] !== undefined)
				return false;
			}
			if (form[0][k] === 0 && grid[lastRow][k] === 0) 
			{
			  if(grid[lastRow][k] !== undefined)
				return false;
			}
		//}
	}
		  return true;
}
function gridClearRow(grid)
{
	let lastRow = lastRowGrid(grid);
	for(let i =0;i<grid[lastRow].length;i++)
	{
		grid[lastRow].splice(i,1);
	}
	return grid;
}

function clearFormRow(form)
{
	let form2 = form.slice(1);
	return form2;
}
function clearGrid(grid)
{
	for(let i =0;i<grid.length;i++)
	{
		let count = 0;
		for(let j=0;j<grid[i].length;j++)
		{
			if(grid[i][j]>=1)
				count++;
		}
		if(count===grid[i].length)
		{
			grid.splice(i,1);
			i--;
		}
	}
	return grid;
}

function rotate(form) 
{
  const newForm=[];
  for (let j = 0; j < form[0].length; j++) 
  {
    const newRow = [];
    for (let i = form.length - 1; i >= 0; i--) 
    {
      newRow.push(form[i][j]);
    }
    newForm.push(newRow);
  }
  return newForm;
}

function flip(form){
  const newForm = [];
  for (let i = form.length - 1; i >= 0; i--) {
    newForm.push(form[i]);
  }
  return newForm;
}
const blocks = [{
    "id": 1,
    "form": [
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 2,
    "form": [
      [0, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 3,
    "form": [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0]
    ]
}];

const blocks2 = [{
    "id": 443,
    "form": [
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 327,
    "form": [
      [0, 1, 0],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0]
    ]
  },
  {
    "id": 891,
    "form": [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]
}];

const blocks3 = [{
    "id": 738,
    "form": [
      [1, 0],
      [1, 1]
    ]
  },
  {
    "id": 841,
    "form": [
      [1, 1],
      [0, 1]
    ]
}];

const blocks4 = [{
    "id": 4892,
    "form": [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 1839,
    "form": [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 0, 0]
    ]
  },
  {
    "id": 8183,
    "form": [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0]
    ]
}];

console.log(layout(blocks));
console.log(layout(blocks2));
console.log(layout(blocks3));
console.log(layout(blocks4));