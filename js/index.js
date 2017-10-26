$(function(){
	let hei={},bai={};
	let kongbai={};
	let isAi=true;
	for(let i=0;i<15;i++){
		$('<div>').addClass('hang').appendTo('.qipan');
		$('<span>').addClass('shu').appendTo('.qipan');
		for(let j=0;j<15;j++){
			kongbai[i+"_"+j]={x:i,y:j};
			$('<li>').addClass('qizi').attr('id',i+"_"+j).data('pos',{x:i,y:j}).appendTo('.qipan');
		}
	}
	let flag=true;
	$('.qipan .qizi').on('click',function(){
		if($(this).hasClass('hei')||$(this).hasClass('bai')){
			return
		}
		let data=$(this).data('pos');
		console.log(data)
		if(flag){
			$(this).addClass('hei');
			hei[data.x+"_"+data.y]=true;
			delete kongbai[data.x+"_"+data.y];
			if(panduan(data,hei)>=5){
				$('.qipan .qizi').off();
				alert('黑棋赢')
			}
			if(isAi){
				let pos=ai();
				$(`#${pos.x}_${pos.y}`).addClass('bai');
				bai[pos.x+"_"+pos.y]=true;
				delete kongbai[pos.x+"_"+pos.y];
				if(panduan(pos,bai)>=5){
					$('.qipan .qizi').off();
					alert('白棋赢')
				}
				return;
			}
		}else{
			$(this).addClass('bai');
			bai[data.x+"_"+data.y]=true;
			delete kongbai[data.x+"_"+data.y];
			if(panduan(data,bai)>=5){
				$('.qipan .qizi').off();
				alert('白棋赢')
			}
		}
		flag=!flag;
	})
	function ai(){
		let max=-Infinity,max1=-Infinity;
		let zb=null,zb1=null;
		for(let i in kongbai){
			let score=panduan(kongbai[i],bai);
			if(score>max){
				max=score;
				zb=kongbai[i];
			}
		}
		for(let i in kongbai){
			let score=panduan(kongbai[i],hei);
			if(score>max1){
				max1=score;
				zb1=kongbai[i];
			}
		}
		return (max>=max1)?zb:zb1;
	}
	function panduan(pos,obj){
		let rows=1,cols=1,zx=1,yx=1;
		// 行
		let i=pos.x,j=pos.y+1;
		while(obj[i+"_"+j]){
			rows++;
			j++;
		}
		j=pos.y-1;
		while(obj[i+"_"+j]){
			rows++;
			j--;
		}
		// 列
		i=pos.x+1,j=pos.y;
		while(obj[i+"_"+j]){
			cols++;
			i++;
		}
		i=pos.x-1;
		while(obj[i+"_"+j]){
			cols++;
			i--;
		}
		// 左斜
		i=pos.x+1,j=pos.y+1;
		while(obj[i+"_"+j]){
			zx++;
			i++;
			j++;
		}
		i=pos.x-1,j=pos.y-1;
		while(obj[i+"_"+j]){
			zx++;
			i--;
			j--;
		}
		// 右斜
		i=pos.x-1,j=pos.y+1;
		while(obj[i+"_"+j]){
			yx++;
			i--;
			j++;
		}
		i=pos.x+1,j=pos.y-1;
		while(obj[i+"_"+j]){
			yx++;
			i++;
			j--;
		}
		return Math.max(rows,cols,zx,yx);
	}
})
