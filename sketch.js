var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDoEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var blocoInvisivel, grupoDeBlocosInvisiveis;
var som;
var pontuacao;

// INICIO
// JOGANDO
// ENCERRAR
var estado = 'INICIO';

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDoEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  som = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);    
  som.loop();
  pontuacao = 0;

  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  
  
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocosInvisiveis = new Group();

  fantasma = createSprite(300, 300, 50, 50);
  fantasma.scale = 0.3;
  fantasma.addImage("ghost", imagemDoFantasma);

}


function draw(){
  background('black');
  drawSprites();
  fill('white');
  text("Pontuação: "+pontuacao, 500, 50);
  if(estado == 'INICIO' && keyDown('space')){
    estado = 'JOGANDO';
  }
  if (estado == 'INICIO'){
    torre.velocityY = 0;
    fill('red');
    textSize(20);
    text("Aperte espaço para iniciar o jogo", 150, 200);
  }
  if (estado == 'JOGANDO'){
    pontuacao = pontuacao + Math.round(getFrameRate()/ 60);
    torre.velocityY = 2;
    if(torre.y > 400){
      torre.y = 300
    }
    
    if(keyDown("left_arrow")){
      fantasma.x = fantasma.x - 3;
    }

    if(keyDown("right_arrow")){
      fantasma.x = fantasma.x + 3;
    }

    if(keyDown("space")){
      fantasma.velocityY = -10;
    }
    
    fantasma.velocityY = fantasma.velocityY + 0.8;
    gerarPortas();
    
    
    if(grupoDeEscaladores.isTouching(fantasma)){
      fantasma.velocityY = 0;
    }

    if(grupoDeBlocosInvisiveis.isTouching(fantasma) || fantasma.y > 600){
      fantasma.destroy();
      torre.destroy();
      grupoDeEscaladores.destroyEach();
      grupoDeBlocosInvisiveis.destroyEach();
      grupoDePortas.destroyEach();
      estado = 'ENCERRAR';
    }
  }
  if (estado == 'ENCERRAR'){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 220,300);
  }
}


function gerarPortas(){
  if(frameCount % 300 == 0){
    porta = createSprite(200,-50);
    porta.addImage(imagemDaPorta);
    
    escalador = createSprite(200,10);
    escalador.addImage(imagemDoEscalador);
    
    blocoInvisivel = createSprite(200,25);
    blocoInvisivel.width = escalador.width;
    blocoInvisivel.height = 2;
    blocoInvisivel.visible = false;
    
    porta.x = Math.round(random(120,400));
    escalador.x = porta.x;
    blocoInvisivel.x = porta.x;
    
    escalador.velocityY = 2;
    porta.velocityY = 2;
    blocoInvisivel.velocityY = 2;
    
    porta.lifetime = 420;
    escalador.lifetime = 420;
    
    fantasma.depth = porta.depth;
    fantasma.depth +=1;
    
    grupoDePortas.add(porta);
    grupoDeEscaladores.add(escalador);
    grupoDeBlocosInvisiveis.add(blocoInvisivel);
  }
}