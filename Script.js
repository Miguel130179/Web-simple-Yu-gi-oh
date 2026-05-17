let mao = document.getElementById("mao")

let Aihand = document.getElementById("iahand")
let aicamp = document.getElementById("Iacamp")
let campo = document.getElementById("campo")
let stfield = document.getElementById("spellsandtraps")



let botstfield = document.getElementById("botspellsandtraps")

let sbuttons = document.getElementById("sbuttons")

let phases = document.getElementById('phases')


let visualturn= document.getElementById("turns")


let pvp = document.getElementById("playerpv")

let bvp = document.getElementById("botpv")



let confirmeffect  = document.getElementById("confirmeffect")

let Player_gy =document.getElementById("Player_gy")

let bot_gy =document.getElementById("bot_gy")

let playerdeck = document.getElementById("deck")

let bdeck = document.getElementById("Bot_deck")


let timer =50
let resetgame
let cara_ou_coroa = Math.floor(Math.random() *2) + 1

 
let playerattack 
let botattack

let ygo
let ygoapi
  
  let touching = false
  
  let estado ={
    //player effects
    Player_Deck:[],
    Bot_Deck:[],
  Buffatk:false,
  BuffDef:false,
  Blockdamage:false,
  //player.
  campo:[],
  cópia_do_campo:[{limite:false,limitedataque:false,setado:false,defensemode:false,timer:1,fiedtime:0,atkmode:false}],
  spelltrap_zone:[],
  cópia_do_strap_zone:[{timer:1,trap:false,fiedtime:0}],
  mao:[],
  playerpv: 8000,
  //ia effects
  IaBuffatk:false,
  IaBuffDef:false,
  IaBlockdamage:false,
  //ia.
  Iacampo:[],
  cópia_do_Iacampo:[{setado:false,defensemode:false,timer:1,fieldtime:0,limite:false,ativou:false}],
  Iamao:[],
  botpv: 8000,
  
  graveyard:[],
  Iagraveyard:[],
playabletobot:true,
botspelltrap_zone:[],
cópia_do_botspelltrap_zone:[],
monsters:[],
botmonsters:[],
player_powerfull_monster: 0,
bot_powerfull_monster: 0
}
estado.cópia_do_Iacampo.splice(0,1)
estado.cópia_do_strap_zone.splice(0,1)
  let pv = document.createElement("h2")
  pv.textContent =estado.playerpv
  
  pv.classList.add("bigtext")
  pvp.appendChild(pv)
  
  let boga = document.createElement("h2")
  boga.textContent = estado.botpv
  boga.classList.add("bigtext")
  
  bvp.appendChild(boga)
  let lvl7msummon = 0
  
  
  
let turn = {
  draw_phase:false,
  support_phase:false,
  main_phase:false,
  battle_phase:false,
  main_phase2:false,
  end_phase:false,
  current:1,
  player:true,
  bot:false,
  Ia_draw_phase:false,
  Ia_support_phase:false,
  Ia_main_phase:false,
  Ia_battle_phase:false,
  Ia_main_phase2:false,
  Ia_end_phase:false,
  pause:false,
  fullhand:false
}

let turntxt = document.createElement("h2")

turntxt.textContent = turn.current
turntxt.classList.add("bigtext")
visualturn.appendChild(turntxt)

let summons ={
  normal_summon:false,
  face_down_summon:false,
  special_summon:false,
  type:"normal"
  
}

estado.cópia_do_campo.splice(0,1)
    let amount
    let classe
    let carrier 
    let sorteio 

effects_rules ={
  afeta_o_oponente:false,
  tipo:"",
  quantidade:0,
  afeta_o_player:false,
  classe:"",
  condição:"",
  condição2:"",
  condição3:"",
  sacrifice:false,
  player:false,
  bot:true,
  activable:false,
  ignition:false,
  condition:false,
  condition22:false,
  require_condition:false,
  afeta_as_playerst:false,
  afeta_as_botst:false,
  effectscondition:false,
  Aieffectscondition:false,
  endturncondition:"",
  target:"",
  equipindex:0,
  botequipindex:0,
  plbuffed:false,
  botbuffed:false
  
}


let conditions33 = {
    "Change of Heart":(carta,estado) =>{
      if(estado.Iacampo.length >=1 && turn.player){
        effects_rules.effectscondition = true
      }
      if(estado.campo.length >=1 && turn.bot){
        effects_rules.Aieffectscondition = true
      }
      
      
    },
    "Ancient Telescope":(carta,estado) =>{
      console.log(estado.Player_Deck.length)
      if(estado.Player_Deck.length >=5&&turn.player){
        effects_rules.effectscondition = true
      }
      
      if(estado.Bot_Deck.length >=5&&turn.bot){
        effects_rules.Aieffectscondition = true
      }
      
    },
      "Card Destruction":(carta,estado) =>{
      if(estado.mao.length >=1 && turn.player){
        effects_rules.effectscondition = true
      }
      if(estado.Iamao.length >=1 && turn.bot){
        effects_rules.Aieffectscondition = true
      }
    },
      "Block Attack":(carta,estado) =>{
      if(estado.Iacampo.length >=1 && turn.player){
        estado.Iacampo.forEach((pos,index) =>{
          if(estado.cópia_do_Iacampo[index].defensemode == false && estado.cópia_do_Iacampo[index].setado == false){
            effects_rules.effectscondition = true
          }
        })
        
      }
      if(estado.campo.length >=1 && turn.bot){
        estado.campo.forEach((pos,index) =>{
          if(estado.cópia_do_campo[index].defensemode == false && estado.cópia_do_campo[index].setado == false){
            effects_rules.Aieffectscondition = true
          }
        })
        
      }
    },
      "Beast Fangs":(carta,estado) =>{
      let beastonfield= estado.campo.filter(b => b.race == 'Beast')
      if(beastonfield.length >=1 && turn.player){
        effects_rules.effectscondition = true
      }
      let Iabeastonfield= estado.Iacampo.filter(b => b.race == 'Beast')
      if(Iabeastonfield.length >=1 && turn.bot){
        effects_rules.Aieffectscondition = true
      }
    },
      "Book of Secret Arts":(carta,estado) =>{
      let spellcasteronfield = estado.campo.filter(s =>s.race =="Spellcaster")
      if(spellcasteronfield.length >=1 && turn.player){
        effects_rules.effectscondition = true
      }
      let iaspellcasteronfield = estado.Iacampo.filter(s =>s.race ="Spellcaster")
      if(iaspellcasteronfield.length >=1 && turn.bot){
        effects_rules.Aieffectscondition = true
      }
    },
  
    "Acid Trap Hole":(carta,estado) =>{
    let Aisets = Estado.cópia_do_Iacampo.filter(s => s.setado == true)
    if(effects_rules.player && Aisets.length >=1){
     effects_rules.effectscondition = true
     
    }
    let playersets = Estado.cópia_do_campo.filter(ps => ps.setado == true)
    if(turn.bot && playersets.length >=1){
     effects_rules.Aieffectscondition = true
     
    }
    },
      "Castle Walls":(carta,estado) =>{
        
        if(effects_rules.player == true &&( estado.campo.length>=1 || estado.Iacampo.length >=1)){
          effects_rules.effectscondition = true
        }
        
        let defaicards  = estado.cópia_do_Iacampo.filter(def=>def.defensemode == true)
        if(turn.bot == true && estado.Iacampo.length >=1){
          effects_rules.Aieffectscondition = true
        }
      },
        "Big Eye":(carta,estado) =>{
          if(estado.Player_Deck.length >=5 && effects_rules.player){
            effects_rules.effectscondition = true
          }
          if(estado.Bot_Deck.length >=5 && effects_rules.bot){
            effects_rules.Aieffectscondition = true
          }
        },
          "Armed Ninja":(carta,estado) =>{
            if((estado.botspelltrap_zone || estado.spelltrap_zone.length >=1) && effects_rules.player){
           effects_rules.effectscondition = true
            }
            if((estado.botspelltrap_zone || estado.spelltrap_zone.length >=1) && effects_rules.bot){
           effects_rules.Aieffectscondition = true
            }
          },
            "Blast Juggler":(carta,estado) =>{
              if(turn.main_phase && estado.campo.length >=3){
                effects_rules.effectscondition = true
              }
              
              if(turn.Ia_main_phase && estado.Iacampo.length>=3){
                effects_rules.Aieffectscondition = true
              }
            },
              "Catapult Turtle":(carta,estado) =>{
                if(turn.main_phase && estado.campo.length >=1){
                  effects_rules.effectscondition = true
                }
                if(turn.Ia_main_phase && estado.Iacampo.length >=1){
                  effects_rules.Aieffectscondition = true
                }
              },
                "Cannon Soldier":(carta,estado) => {
                  if(turn.main_phase && estado.campo.length >=1){
                    effects_rules.effectscondition = true
                  }
                  if(turn.Ia_main_phase && estado.Iacampo.length >=1){
                    effects_rules.Aieffectscondition = true
                  }
                },
                  "Barrel Dragon":(carta,estado) =>{
                    if(turn.main_phase && estado.Iacampo.length >=1){
                      effects_rules.effectscondition= true
                    }
                    
                    if(turn.Ia_main_phase && estado.campo.length >=1){
                      effects_rules.Aieffectscondition = true
                    }
                  },
                  "Bladefly":(carta,estado) =>{
                    effects_rules.effectscondition = true
                    effects_rules.classe ="constante"
                    
                  }
}




let effects ={
  //monstros 
  //melhorar Equip
  //fazer efeitos pro bot
  //o ideal é passa os efeitos locais do bot daqui pra execute_conditions
  "Castle of Dark Illusions":(carta,estado) =>{
  
  
    
    if(effects_rules.classe == "flip" && effects_rules.bot){
      estado.Iacampo.forEach((pos,index) =>{
        if(estado.Iacampo[index].race == "Zombie"){
          estado.Iacampo[index].atk+=200
          
          effects_rules.quantidade =4
        }
      })
    }
    if(effects_rules.condição =="Support phase" && effects_rules.quantidade>0 && effects_rules.quantidade <5&& turn.bot){
      estado.Iacampo.forEach((pos,index) =>{
        if(estado.Iacampo[index].race =="Zombie"){
          estado.Iacampo[index].atk+=200
          
          effects_rules.quantidade -=1
        }
        
      })
      
      
      
    }
    
    
    if(effects_rules.classe =="flip" && effects_rules.player){
      
      
      
      estado.campo.forEach((pos,index) =>{
        if(estado.campo[index].race =="Zombie"){
          estado.campo[index].atk+=200
          
          effects_rules.quantidade =4
        }
        
      })
    }
      if(effects_rules.condição =="Support phase" && effects_rules.quantidade>0 && effects_rules.quantidade <5&& turn.player){
      estado.campo.forEach((pos,index) =>{
        if(estado.campo[index].race =="Zombie"){
          estado.campo[index].atk+=200
          
          effects_rules.quantidade -=1
        }
        
      })
    }
    
    
    
carlinhos_modo_rage = false
  },
  "Big Eye":(carta,estado) =>{
    
    if(effects_rules.classe =="flip"){
      
      for(let i =estado.Player_Deck.length-5;i<=estado.Player_Deck.length-1;i++){
        
        alert(estado.Player_Deck[i].name)
      
      }
      effects_rules.quantidade =5
      effects_rules.tipo ="alterar a ordem"
      
      execute_conditions()
      
    }
  },
  "Armed Ninja":(carta,estado) =>{
    
    if(effects_rules.classe =="flip" && effects_rules.player == true){
      effects_rules.afeta_as_botst = true
      effects_rules.afeta_as_playerst = true
      effects_rules.tipo = "destruction"
      effects_rules.condição ="spellcard"
      render_field()
      alert("escolha alguma carta na zona de magia/armadilha baixada")
    }
    if(effects_rules.classe == "flip"&& effects_rules.bot == true){
      effects_rules.afeta_as_botst = true
      effects_rules.afeta_as_playerst = true
      effects_rules.tipo = "destruction"
      effects_rules.condição ="spellcard"
      render_field()
    }
  },
  "Book of Secret Arts":(carta,estado) =>{
    
  let Iamagicians = estado.Iacampo.filter(Mago =>Mago.race =="Spellcaster" )
    estado.Iacampo.forEach((pos, index) =>{
      
    
     
     if(Iamagicians.length >=1){
       effects_rules.quantidade =500
    effects_rules.tipo ="Equip"
    effects_rules.afeta_o_bot = true
    effects_rules.condição ="Spellcaster"
    effects_rules.bot = true
    execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
    }
    
   })
    let magicians = estado.campo.filter(Mago =>Mago.race =="Spellcaster" )
    if(turn.main_phase && magicians.length >=1){
    alert("selecione um monstro do tipo mago")
    effects_rules.quantidade =500
    effects_rules.tipo ="Equip"
    effects_rules.afeta_o_player = true
    effects_rules.player= true
    effects_rules.condição ="Spellcaster"
    
    }
    
    
  },
  "Beast Fangs":(carta,estado) =>{
    let Iabeasts = estado.Iacampo.filter(besta =>besta.race =="Beast" )
    estado.Iacampo.forEach((pos, index) =>{
      
    

     if(Iabeasts.length >=1){
       effects_rules.quantidade =500
    effects_rules.tipo ="Equip"
    effects_rules.afeta_o_bot = true
    effects_rules.condição ="Beast"
    effects_rules.bot = true
    
    estado.cópia_do_botspelltrap_zone[effects_rules.botequipindex].equipedmonster =estado.campo[index].name
    
    estado.cópia_do_botspelltrap_zone[effects_rules.botequipindex].equipedmonster =index
    
    
    execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
    }
   })
    
         
    
    let beasts = estado.campo.filter(besta =>besta.race =="Beast" )
    if(turn.main_phase && beasts.length >=1){
    alert("selecione um monstro do tipo besta")
    effects_rules.quantidade =500
    effects_rules.tipo ="Equip"
    effects_rules.afeta_o_player = true
    effects_rules.player= true
    effects_rules.condição ="Beast"
    }
  },
  "Acid Trap Hole":(carta,estado) =>{
    /*/desc:Target 1 face-down Defense Position monster on the field; flip it face-up, then destroy it if its DEF is 2000 or less, or rekturn it face-down if its DEF is more than 2000.
    /*/
    
    
    if(effects_rules.player){
    effects_rules.afeta_o_oponente = true
    effects_rules.afeta_o_player= true
    effects_rules.tipo ="destruction"
    effects_rules.condição = "flip"
    effects_rules.condição2 ="def"
  
    render_field()
    }
    
    
    if(effects_rules.bot){
    effects_rules.afeta_o_player= true
    effects_rules.afeta_o_oponente = true
    effects_rules.tipo ="destruction"
    effects_rules.condição = "flip"
    effects_rules.condição2 ="def"
  estado.campo.forEach((pos,index) =>{
      if(estado.cópia_do_campo[index].setado == true){
      estado.cópia_do_campo[index].setado = false
      estado.cópia_do_campo[index].defensemode = true
      
    render_field()
    
    if(estado.cópia_do_campo[index].def >=2000){
      estado.campo.splice(index,1)
    }
    else{
      estado.cópia_do_campo[index].defensemode = false
      estado.cópia_do_campo[index].setado = true
    }
      }
    })
    
    render_field()
    }
    
    estado.campo.forEach((pos,index) =>{
      if(estado.cópia_do_campo[index].setado == true){
        effects_rules.condition = true
      }
    })
    
  },
  "Castle Walls":(carta,estado) =>{
    //melhorar
    
    
      effects_rules.bot = true
      effects_rules.tipo = "Buffdef"
      
      let mega_sena
      estado.Iacampo.forEach((pos,index) =>{
      
      
      
      if(estado.cópia_do_Iacampo[index].defensemode =true){
        estado.Iacampo[index].def+=500
        effects_rules.condition = false
      }
      
      })
      
    
    
    
    
      if(estado.campo.length >=1 &&effects_rules.player){
        
        
        
        
    alert("selecione um monstro. O monstro escolhido ganhara 500 de defesa até o final deste turno")
    
    effects_rules.afeta_o_player = true
    effects_rules.afeta_o_oponente = true
    effects_rules.tipo ="Buffdef"
    effects_rules.quantidade = 500
    effects_rules.player =false
    render_field()
    }
    
  },
  "Block Attack":(carta,estado) =>{
    
      
      
    
    if(turn.Ia_main_phase == true&& estado.campo.length >=1){
      
      estado.campo.forEach((pos,index) =>{
        if(estado.cópia_do_campo[index].setado == false && estado.cópia_do_campo[index].defensemode == false && effects_rules.Aieffectscondition){
          estado.cópia_do_campo[index].defensemode = true
          effects_rules.Aieffectscondition = false
          render_field()
        }
      })
      
    }
    if(turn.main_phase && effects_rules.player){
    effects_rules.classe ="atk pos"
    effects_rules.afeta_o_oponente = true
    effects_rules.tipo ="switchmodedef"
    effects_rules.player = true
    alert("selecione o alvo")
    render_field()
    }
    
    if(turn.Ia_main_phase && effects_rules.condition && effects_rules.bot){
    
    
    
    estado.campo.forEach((pos,index) =>{
      
      if(effects_rules.condition){
        
        estado.cópia_do_campo[index].defensemode = true
        effects_rules.condition = false
      }
    })
    }
    
    
    
  },
  
  
  "Card Destruction":(carta,estado) =>{
    
     amountcards = estado.mao.length -1
     if(turn.main_phase){
    for(let i = estado.mao.length ;i >=0;i--){
      estado.mao.splice(i,1)
      
      draw_cards()
      if(estado.mao.length <=0){
        playerdraw =0
      }
      if(playerdraw  >= amountcards&& i <=0){
        
        amountcards = 4
      }
    }
    
    
    for(let i = estado.Iamao.length ;i >=0;i--){
      estado.Iamao.splice(i,1)
      
      draw_cards()
      if(estado.Iamao.length <=0){
        botdraw =0
      }
      if(botdraw  >= amountcards&& i <=0){
        
        amountcards = 4
      }
    }
    
    
    
    
     }
     
     if(turn.Ia_main_phase ){
       for(let i = estado.Iamao.length ;i >=0;i--){
      estado.Iamao.splice(i,1)
      
      draw_cards()
      if(estado.Iamao.length <=0){
        botdraw =0
      }
      if(botdraw  >= amountcards&& i <=0){
        
        amountcards = 4
      }
    
       }
       
       
       for(let i = estado.mao.length ;i >=0;i--){
      estado.mao.splice(i,1)
      
      draw_cards()
      if(estado.mao.length <=0){
        playerdraw =0
      }
      if(playerdraw  >= amountcards&& i <=0){
        
        amountcards = 4
      }
    }
     }
     draw_cards()
  },
  "Blast Juggler":(carta,estado) =>{
    if(turn.main_phase){
    effects_rules.afeta_o_oponente = true
    effects_rules.tipo ="destruction blast"
    effects_rules.classe ="face-up"
    let vasco = estado.campo.filter(a =>a.atk <=1000)
    if(vasco.length >=2){
      effects_rules.sacrifice = true
    render_field()
    
    }
    }
    
    if(turn.Ia_main_phase){
      effects_rules.afeta_o_player = true
    effects_rules.tipo ="destruction blast"
    effects_rules.classe ="face-up"
    let vasco = estado.campo.filter(a =>a.atk <=1000)
    if(vasco.length >=2){
      effects_rules.sacrifice = true
    render_field()
    
    }
    }
  },
  
  
  "Catapult Turtle":(carta,estado) =>{
    
    
    
    if(turn.main_phase){
    effects_rules.afeta_o_player = true
    effects_rules.tipo ="reduzir pv heavy"
    render_field()
    }
    estado.Iacampo.forEach((pos,index) =>{
      
    
    if(turn.Ia_main_phase){
      estado.playerpv-=estado.Iacampo[index].atk /2
      effects_rules.condition = false
    }
    })
  },
  "Cannon Soldier":(carta,estado)  =>{
    if(turn.main_phase){
    effects_rules.afeta_o_player = true
    effects_rules.tipo ="reduzir pv"
    render_field()
    alert("tribute algum monstro")
    }
    
    
    
    
    estado.Iacampo.forEach((pos,index) =>{
      
    
    if(turn.Ia_main_phase ){
      estado.playerpv-=500
      effects_rules.condition = false
    }
    })
  },
  "Bladefly":(carta,estado) =>{
    
    
    if(turn.main_phase){
   
   console.log(estado.monsters)
   //corrigir aqui e no renderfield
   
   
    estado.Buffatk= true
    
    estado.campo.forEach((pos,index) =>{
estado.monsters.push({afetados:false})
      if(estado.campo[index].attribute=='WIND'&& estado.monsters[index].afetados == false){
        
        
      estado.campo[index].atk+=500
      
    
   estado.monsters[index].afetados = true
   
      }
    })
    
    
    
    
    }
    
    
    if(turn.Ia_main_phase){
   
   //corrigir aqui e no renderfield
   
   
    
    estado.Iacampo.forEach((pos,index) =>{
      estado.botmonsters.push({afetados:false})
      if(estado.Iacampo[index].attribute=='WIND'&& estado.botmonsters[index].afetados == false){
      estado.Iacampo[index].atk+=500
      estado.botmonsters[index].afetados = true
      }
    })
  
    }
  },
  
  
  //magias
  "Ancient Telescope":(carta,estado) =>{
    
    effects_rules.condition = true
    
    
    if(turn.main_phase){
      
      for(let i =estado.Player_Deck.length-5;i<=estado.Player_Deck.length-1;i++){
        
        
      }
    }
  },
  "Change of Heart":(carta,estado) =>{
    
    
    
    if(turn.main_phase == true){
    
    effects_rules.afeta_o_oponente =true
    effects_rules.tipo ="steal a monster"
    effects_rules.quantidade =1
    effects_rules.endturncondition = "return monster"
   // alert("pista1")
    render_field()
    }
    
    if(turn.bot ){
    
    effects_rules.afeta_o_player =true
    effects_rules.tipo ="steal a monster"
    effects_rules.endturncondition = "return monster"
    effects_rules.quantidade =1
   
    render_field()
    }
    
    
  },
  
  "Barrel Dragon":(carta,estado) =>{
    
    if(turn.main_phase == true && estado.Iacampo.length >=1){
      alert("escolha o alvo")
     effects_rules.afeta_o_oponente = true
     effects_rules.tipo = "destruction"
     effects_rules.quantidade = 1
     effects_rules.condição ="sorteio"
     effects_rules.condição2 ="3 moedas"
     render_field()
    }
    
    if(turn.Ia_main_phase && estado.campo.length >=1){
      
     effects_rules.afeta_o_player = true
     effects_rules.tipo = "destruction"
     effects_rules.quantidade = 1
     effects_rules.condição ="sorteio"
     effects_rules.condição2 ="3 moedas"
     carlinhos_modo_rage = true
  estado.campo.forEach((pos,index) =>{
    execute_conditions(index,effects_rules.tipo,effects_rules.quantidade,limitations)
  })
    }
    

  }
}



let endturn
let playerdraw = 0
let botdraw =0
let starting = true
let battleph
let amountcards = 4
let deckcards =40

//separar por funções cada fase

async function draw_cards(){
  
  
  
  
  
  
  
  
  //tem que passar parametros
  
   ygoapi = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=2000-01-01&enddate=2002-08-23&dateregion=tcg`)
  
   ygo = await ygoapi.json()
   let cartas 
  let iacards
  
  if(playerdraw <=amountcards){
  let x = Math.floor(Math.random()*40) + 1
  for(let i =0;i<deckcards;i++){
    let xyz = Math.floor(Math.random()*40) + 1
    estado.Player_Deck[i] = ygo.data[xyz]
    
    let yzx= Math.floor(Math.random()*40)+1
    estado.Bot_Deck[i] = ygo.data[yzx]
  }
  playerdraw+=1
  
  
  
  

  
  if(cara_ou_coroa == 1 && playerdraw ==5  &&botdraw==4){
  alert("player turn")
    turn.player = true
    turn.bot =false
    cara_ou_coroa =32
  }
 if(cara_ou_coroa ==2 && botdraw==4 &&playerdraw==5){
  alert("bot turn")
    turn.bot = true
    turn.player =false
    turn.Ia_main_phase = true
  summons.normal_summon = false
    
    cara_ou_coroa =32
    Ia_main_phase()
  }
  
  
  
  
  estado.Player_Deck.forEach((pos,index) =>{
    playerdeck.innerHTML =""
  let deckimg = document.createElement("img")
  
  deckimg.classList.add("fieldcards")
  
  
  deckimg.src = "ygo backside.webp"
  
  playerdeck.appendChild(deckimg)
  
  })
  
  
  estado.mao.push(estado.Player_Deck[estado.Player_Deck.length- 1])
  deckcards-=1
  estado.Player_Deck.splice(estado.Player_Deck.length -1,1)
  
 
  }
  

  if(botdraw <=4){
    botdraw+=1
        x = Math.floor(Math.random()*40) + 1
        
  estado.Iamao.push(estado.Bot_Deck[estado.Bot_Deck.length - 1])
  estado.Bot_Deck.splice(estado.Bot_Deck.length -1,1)
  
  estado.Bot_Deck.forEach((pos,index) =>{
    
bdeck.innerHTML =""
    let botdeckimg = document.createElement("img")
    botdeckimg.classList.add("fieldcards")
    botdeckimg.src ="ygo backside.webp"
    bdeck.appendChild(botdeckimg)
    
  })
  estado.Iamao.forEach((pos,index) =>{
    if(estado.Iamao[index].type =="Fusion Monster"){
       x = Math.floor(Math.random()*40) + 1
      estado.Iamao[index] = ygo.data[x]
      
    }
  })
  }

estado.campo.forEach((pos,index) =>{
  

turn.support_phase = true
 if(turn.support_phase == true && carlinhos_modo_rage == false && turn.player ){
   if(estado.campo[index].type =="Flip Effect Monster"){
   effects_rules.condição ="support_phase"
   carlinhos_modo_rage = true
   effects_rules.quantidade+=1
   ler_condição(estado.campo[index])
   
   if(effects_rules.effectscondition){
     ativar_efeitos(estado.campo[index])
   }
   }
 }
 turn.support_phase = false
})

estado.Iacampo.forEach((pos,index) =>{
  

turn.Ia_support_phase = true
 if(turn.Ia_support_phase == true && carlinhos_modo_rage == false){
   
 if(estado.Iacampo[index].type =="Flip Effect Monster")
   effects_rules.condição ="support_phase"
   carlinhos_modo_rage = true
   effects_rules.quantidade+=1
   ativar_efeitos(estado.Iacampo[index])
   
 }
 turn.support_phase = false
})
 let fieldimg = document.createElement('img')
 

 
if(turn.player){
  turn.Ia_main_phase = false
  turn.main_phase = true
}

  if(turn.bot){
    turn.main_phase = false
    turn.Ia_main_phase = true
    
  }
  
Aihand.innerHTML =""
estado.Iamao.forEach((index) =>{
  //bug: nsummon falha as vezes
  
  let iahandimg = document.createElement("img")
iahandimg.src ='ygo backside.webp'
iahandimg.classList.add("handcards")

    


iahandimg.addEventListener("click",() =>{
  
})


Aihand.appendChild(iahandimg)
})



if(playerdraw ==4){
  phases.innerHTML =""
  
  
  endturn = document.createElement("button")
  endturn.classList.add("redondo")
  endturn.textContent ="endturn"
  endturn.style.background ="blue"
  
  
  endturn.style.fontweight ="bold"
  
  
  phases.appendChild(endturn)
  
   battleph= document.createElement("button")
  battleph.classList.add("redondo")
  battleph.textContent =" batalhar"
  battleph.style.background ="red"
  
  
  battleph.style.fontweight ="bold"
  
  
  endturn.addEventListener("click",async() =>{
    if(turn.player){
      
      for(let c = 0;c<estado.campo.length ;c++){
        estado.cópia_do_campo[c].limitedataque = false
      }
      console.log(estado.mao.length)
      if(estado.mao.length >=7){
        mao.innerHTML =""
      await descarte()
       
      }
      if(effects_rules.endturncondition !==""){
        clear_effect_rules()
        execute_conditions()
      }
  
  botdraw = 4
    turn.current+=1
    
    
  turn.main_phase = false
  turn.battle_phase = false
  turn.Ia_main_phase = true
  summons.normal_summon = false
  turn.player = false
  turn.bot = true
  let turntxt = document.createElement("h2")

turntxt.textContent = turn.current
turntxt.classList.add("bigtext")
visualturn.innerHTML =""
visualturn.appendChild(turntxt)
  draw_cards()
  console.log(estado.Iamao)
  
  Ia_main_phase()
  
  
    }
  })
  
  
  
  phases.appendChild(battleph)
  battleph.addEventListener("click",() =>{
      if(turn.current >=2 && turn.player){
      alert("battle phase")
    turn.battle_phase = true
    turn.main_phase = false
    turn.Ia_main_phase = false
    
   battle_phase()
   
   
     
      }
  })
  
  let main_phase2 = document.createElement("button")
  
  main_phase2.classList.add("redondo")
  main_phase2.textContent ="main phase2"
  
  main_phase2.style.background ="#f7b729"
  phases.appendChild(main_phase2)
  
  main_phase2.addEventListener("click",() =>{
    if(turn.battle_phase){
      alert("main_phase 2")
    turn.main_phase = true
    turn.battle_phase = false
    main_phase()
    }
  })
  Aihand.innerHTML =""
  if(turn.Ia_draw_phase == true){
  
  
}

}






mao.innerHTML =""
estado.mao.forEach((pos,index) =>{
  let handimg  = document.createElement("img")
  handimg.classList.add("handcards")
  if(estado.mao[index].type =="Fusion Monster"){
       x = Math.floor(Math.random()*40) + 1
      estado.mao[index] = ygo.data[x]
      
    }
  handimg.src =estado.mao[index].card_images[0].image_url_small 
  
  mao.appendChild(handimg)
  
  
  handimg.addEventListener("mouseenter",() =>{
    if(amountcards>=4){
      handimg.classList.remove("handcards")
      handimg.classList.add("handcards2")
}
  })
  handimg.addEventListener("mouseout",() =>{
    handimg.classList.remove("handcards2")
      
      handimg.classList.add("handcards")
  })
  
  
  
  
    handimg.addEventListener("click",() =>{
      
      if(turn.player && !turn.battle_phase){
    
  if(estado.mao[index].type =="Spell Card"){
    ler_condição(estado.mao[index])
    console.log(effects_rules.effectscondition)
    sbuttons.innerHTML =""
    if(effects_rules.effectscondition == true){
      
      let spellactivate = document.createElement("button")
    spellactivate.textContent ="ativar"
    sbuttons.appendChild(spellactivate)
    spellactivate.classList.add("downedcard")
    spellactivate.addEventListener("click",() =>{
      turn.main_phase = true
      main_phase(pos,index,"active")
      handimg.remove()
      
    })
    
    }
    effects_rules.effectscondition = false
    
    let spellset = document.createElement("button")
    spellset.textContent ="baixar"
    
    spellset.classList.add("downedcard")
    sbuttons.appendChild(spellset)
    
    
    spellset.addEventListener("click",() =>{

      //sistema de set de trap e spell
      console.log(estado.spelltrap_zone)
      main_phase(pos,index,"down")
      handimg.remove()
    })
  }
  
  
  if(estado.mao[index].type =="Trap Card"){
    sbuttons.innerHTML =""
    
    let spellset = document.createElement("button")
    spellset.textContent ="baixar"
    
    spellset.classList.add("downedcard")
    sbuttons.appendChild(spellset)
    spellset.addEventListener("click",() =>{
      
      
      
      console.log(estado.spelltrap_zone)
      let down ="down"
      main_phase(estado.mao[index],index,down)
      handimg.remove()
    })
  }
    if(summons.normal_summon ==false && estado.mao[index].type =="Effect Monster"||estado.mao[index].type =="Normal Monster" ||estado.mao[index].type =="Flip Effect Monster"){
      
    sbuttons.innerHTML=""
 
    let nsummon = document.createElement("button")
    nsummon.textContent = "invocar"
    
  
    nsummon.classList.add("downedcard")
    let bsummon = document.createElement("button")
  bsummon.textContent ="baixar"
  
  bsummon.classList.add("downedcard")
  sbuttons.appendChild(nsummon)
  sbuttons.appendChild(bsummon)
    
    
  nsummon.addEventListener("click",() =>{
    turn.main_phase = true
    if(summons.normal_summon == false && turn.main_phase){
    summons.type ="normal"
    
    console.log(index)
    
    main_phase(pos,index,summons.type)
    console.log(estado.mao)
    handimg.remove()

    sbuttons.innerHTML =""
    
    
    mao.innerHTML =""
    render_hand()
}

 console.log(estado.campo)
  })
  bsummon.addEventListener('click',() =>{
    turn.main_phase = true
    if(!summons.normal_summon && turn.main_phase){
    summons.type ="set"
    
    
    main_phase(pos,index,summons.type)
    handimg.remove()
    console.log(estado.campo)
    }
  })
    }
      }
  })
  
  
})



}
let draw = null
let timerdrawcards
if(playerdraw<=4 && draw == null){
   timerdrawcards = setInterval(draw_cards,100)
}
if(turn.bot && draw!==null){
  clearInterval(timerdrawcards)
  timerdrawcards = null
}




let timer2 = 2
let ultratimer
let startimer
let intervalo
async function main_phase(carta,indexx,type){
  //consertar tribute summon e spell
  
  
 
 
 
  
  
  
  if(turn.main_phase ==true){
    //consertar os equip
    if(estado.mao[indexx].type =="Spell Card"&& estado.mao[indexx].humanReadableCardType =="Equip Spell"&&type =="active"){
      estado.spelltrap_zone.push(estado.mao[indexx])
   

estado.cópia_do_strap_zone.push({timer:turn.current,trap:false,equip:true,index:estado.cópia_do_strap_zone.length ,equipedmonster:"",equipedmonsterindex:0})

effects_rules.equipindex = estado.cópia_do_strap_zone.length -1
ativar_efeitos(estado.mao[indexx])
estado.mao.splice(indexx,1)
render_field()
    }
    
 if(estado.mao[indexx].type =="Spell Card"&& estado.mao[indexx].humanReadableCardType!=="Equip Spell"&&type =="active"){
   
   let spellimg = document.createElement("img")




  console.log(estado.campo)
  spellimg.src =carta.card_images[0].image_url_small
  
  ultratimer = 40
 
 

spellimg.classList.add("fieldcards")
console.log(estado.campo)
stfield.appendChild(spellimg)
delay(200)
estado.mao.splice(indexx,1)
effects_rules.player = true
ativar_efeitos(carta)
startimer = true
summons.type =""
timer2 = 40

await delay(1000)
  render_field()
  
 }
  
  if(estado.mao[indexx].type =="Spell Card"&&type =="down"){
    if(estado.mao[indexx].humanReadableCardType =="Equip Spell"){
    
    
  estado.spelltrap_zone.push(estado.mao[indexx])
    estado.cópia_do_strap_zone.push({timer:turn.current,trap:false,equip:false})
    estado.mao.splice(indexx,1)
  }
  else{
   estado.spelltrap_zone.push(estado.mao[indexx])
   

estado.cópia_do_strap_zone.push({timer:turn.current,trap:false,equip:false})
  
 
 estado.mao.splice(indexx,1)









  }
  render_field()
 }
  if(estado.mao[indexx].type =="Trap Card"){
    estado.spelltrap_zone.push(estado.mao[indexx])
   
    estado.cópia_do_strap_zone.push({timer:turn.current,trap:true,fieldtime:0})
    estado.mao.splice(indexx,1)
    render_field()
  }
  
  
  render_field()
  if(turn.main_phase && summons.normal_summon == false && turn.main_phase && estado.mao[indexx].level <=4 && estado.campo.length <5 && summons.type =="normal"  ){
    console.log(indexx)





console.log(estado.cópia_do_campo)
console.log(estado.campo)
console.log(estado.mao)
campo.innerHTML =""
finalizarSummon(estado.mao[indexx],indexx,false)

  estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
  render_field()
  summons.normal_summon = true
  }
  
  
   
  
    
  
  if(turn.main_phase && summons.normal_summon == false && estado.mao[indexx].level>=5 && estado.mao[indexx].level <7&& estado.campo.length >=1  && summons.type =="normal"){
    
    alert("é necessario 1 tributo ")
console.log(indexx)
campo.innerHTML =""
console.log(estado.mao)

estado.campo.forEach((pos,index) =>{
  
let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src =estado.campo[index].card_images[0].image_url_small
  fieldcards.classList.add("fieldcards")
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.addEventListener("click",() =>{
  
  
estado.graveyard.push(estado.campo[index])
  estado.campo.splice(index, 1)
  
  finalizarSummon(estado.mao[indexx],indexx,false)
estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
})


})

summons.normal_summon = true

  }


if(turn.main_phase && summons.normal_summon == false && estado.mao[indexx].level>=7&& estado.campo.length >=2  && summons.type =="normal"){
  
alert("é necessario 2 tributos")
campo.innerHTML =""
console.log(estado.mao)
console.log(indexx)
estado.campo.forEach((pos,index) =>{
  
let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src =estado.campo[index].card_images[0].image_url_small
  fieldcards.classList.add("fieldcards")
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.addEventListener("click",() =>{
  estado.campo[index].tributado = true
  if(estado.campo[index].tributado == true){
  
  estado.graveyard.push(estado.campo[index])
  estado.campo.splice(index, 1)
  estado.cópia_do_campo.splice(index, 1)
  
  
  lvl7msummon +=1
   console.log(estado.mao[indexx])
  if(lvl7msummon == 1){
    alert("é necessario 1 tributo ")
  }
  if(lvl7msummon >=2){
  alert(lvl7msummon)
    
    
    lvl7msummon = 0
    finalizarSummon(estado.mao[indexx],indexx,false)
    estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
  }
  
  
  
  //consertar o sistema de tribute summon de monstros de nível 7 ou mais
}
})


})

summons.normal_summon = true
}


console.log(estado.spelltrap_zone)
if(turn.main_phase && summons.normal_summon == false && turn.main_phase && estado.mao[indexx].level <=4 && estado.campo.length <5 && summons.type =="set"){
finalizarSummon(estado.mao[indexx],indexx,true)
estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ativar_efeitos(estado.botspelltrap_zone[index])
    if(effects_rules.condition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  })
  render_field()
summons.normal_summon = true
  }
  
  
   
  
    
  
  if(turn.main_phase && summons.normal_summon == false && estado.mao[indexx].level>=5 && estado.mao[indexx].level <7&& estado.campo.length >=1  && summons.type =="set"){
    alert("é necessario 1 tributo ")

campo.innerHTML =""
console.log(estado.mao)

estado.campo.forEach((pos,index) =>{
  
let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src =estado.campo[index].card_images[0].image_url_small
fieldcards.classList.add("fieldcards")
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.addEventListener("click",() =>{
  
  
estado.graveyard.push(estado.campo[index])
  estado.campo.splice(index, 1)
  estado.cópia_do_campo.splice(index,1)
  finalizarSummon(estado.mao[indexx],indexx,true)
estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
})


})

summons.normal_summon = true

  }


if(turn.main_phase && summons.normal_summon == false && estado.mao[indexx].level>=7&& estado.campo.length >=2  && summons.type =="set"){
  
alert("é necessario 2 tributos")
campo.innerHTML =""
console.log(estado.mao)

estado.campo.forEach((pos,index) =>{
  
let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src =estado.campo[index].card_images[0].image_url_small
  fieldcards.classList.add("fieldcards")
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.addEventListener("click",() =>{
  estado.campo[index].tributado = true
  if(estado.campo[index].tributado == true){
  
  estado.graveyard.push(estado.campo[index])
  estado.campo.splice(index, 1)
  estado.cópia_do_campo.splice(index, 1)
  
  
  lvl7msummon +=1
   console.log(estado.mao[indexx])
  if(lvl7msummon == 1){
    alert("é necessario 1 tributo ")
  }
  if(lvl7msummon >=2){
  alert(lvl7msummon)
    finalizarSummon(estado.mao[indexx],indexx,true)
    estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
  summons.normal_summon = true
    
    
  }
  
  
  
  //consertar o sistema de tribute summon de monstros de nível 7 ou mais
}
})


})

  }

    
  }
  sbuttons.innerHTML =""
  
  
}
  
  
 
let pattacking = false
let botattacking = false
let indexatk
async function battle_phase(indexx){
  try{
  if(turn.battle_phase){
    
  let cleide
    
    campo.innerHTML =""
    aicamp.innerHTML =""
    
    estado.campo.forEach(async(carta,index) =>{
      //corrigir
      if(estado.cópia_do_campo[index].atkmode && estado.cópia_do_campo[index].defensemode == false&&estado.cópia_do_campo[index].setado == false){
      let playerfcards = document.createElement("img")
      playerfcards.src = estado.campo[index].card_images[0].image_url_small
      playerfcards.classList.add("fieldcards")
      console.log(estado.campo)
      
      campo.appendChild(playerfcards)
      playerfcards.addEventListener("click",async() =>{
        if(estado.cópia_do_campo[index].limitedataque == false){
        alert(`${estado.campo[index].name} esta atacando`)
        
        playerattack = estado.campo[index].atk
        
        cleide = index
        if(estado.Iacampo.length <=0 &&playerattack>0&& turn.current >=2){
   estado.botpv-=playerattack
  boga.textContent = estado.botpv
  boga.classList.add("bigtext")
  bvp.appendChild(boga)
  if(estado.botpv <=0){
    estado.botpv =0
    alert("o player venceu")
   await reset()
  }
  }
  estado.cópia_do_campo[index].limitedataque = true
        }
      })
      }
      else{
        
      }
      
      
      
      
    })
    
      estado.campo.forEach((pos,index) =>{
        if(estado.cópia_do_campo[index].defensemode == true){
      
    let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src = estado.campo[index].card_images[0].image_url_small
  fieldcards.classList.add("cardset")
  
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.style.zIndex ="99999"

fieldcards.addEventListener("click",() =>{
  
  
})
}
    
  estado.campo.forEach((pos,index) =>{
    if(estado.cópia_do_campo[index].setado == true){
      
    let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src = "ygo backside.webp"
  fieldcards.classList.add("cardset")
  
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.style.zIndex ="99999"


}
      
  })
  


      })
      
estado.Iacampo.forEach((pos,index) =>{
  if(estado.cópia_do_Iacampo[index].defensemode == false&& estado.cópia_do_Iacampo[index].setado == false){
let Iacards = document.createElement("img")
  Iacards.classList.add('cavalo')
  Iacards.src = estado.Iacampo[index].card_images[0].image_url_small
  
  aicamp.appendChild(Iacards)
  aicamp.style.zIndex ="999"
  Iacards.style.zIndex ="9999998"
  console.log(estado.Iacampo)
  Iacards.addEventListener("click",async() =>{
estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
    botattack = estado.Iacampo[index].atk
    
    if(playerattack > botattack){
      estado.Iagraveyard.push(estado.Iacampo[index])
      console.log(estado.Iagraveyard)
    estado.Iacampo.splice(index,1)
    estado.botpv-= playerattack - botattack
  boga.textContent = estado.botpv
  boga.classList.add("bigtext")
  bvp.appendChild(boga)
    battle_phase()
    if(estado.botpv <=0){
    estado.botpv =0
    alert("o player venceu")
    await reset()
  }
    
  }
  else if(playerattack < botattack){
    
    estado.graveyard.push(estado.campo[cleide])
    estado.campo.splice(cleide,1)
    estado.playerpv-= (botattack - playerattack)
    pv.textContent =estado.playerpv
  
  pv.classList.add("bigtext")
  pvp.appendChild(pv)
  }
  
  if(playerattack == botattack){
    estado.Iagraveyard.push(estado.Iacampo[index])
      console.log(estado.graveyard)
    estado.Iacampo.splice(index,1)
    
    estado.graveyard.push(estado.campo[cleide])
      console.log(estado.graveyard)
    estado.campo.splice(cleide,1)
    
  render_field()
  
  }
  })
  }
  if(estado.cópia_do_Iacampo[index].setado== true){
      let aifieldcards = document.createElement("img")
    console.log(estado.Iamao)
      aifieldcards.classList.add("Iacardset")
    aifieldcards.src ="ygo backside.webp"
      
      
      
      aicamp.appendChild(aifieldcards)
      console.log(estado.Iacampo) 
      
      aifieldcards.addEventListener("click",() =>{
        estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ativar_efeitos(estado.botspelltrap_zone[index])
    if(effects_rules.condition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  })
        
        
        
        if(playerattack > estado.Iacampo[index].def){
          if(estado.Iacampo[index].type =="Flip Effect Monster"){
            
            estado.Iacampo[index].setado = false
            estado.Iacampo[index].defensemode = false
            ativar_efeitos(estado.Iacampo[index])
            
              effects_rules.bot= true
              
              ler_condição(estado.Iacampo[index])
            if(effects_rules.effectscondition){
            ativar_efeitos(estado.Iacampo[index])
            }
              
              
              
            }
          estado.Iacampo.splice(index,1)
           estado.cópia_do_Iacampo.splice(index,1)
            render_field()
            
            
        }
        
        else{
          estado.Iacampo[index].setado = false
            estado.Iacampo[index].defensemode = false
          if(estado.Iacampo[index].type =="Flip Effect Monster"){
            
            effects_rules.bot= true
            ler_condição(estado.Iacampo[index])
            if(effects_rules.effectscondition){
            ativar_efeitos(estado.Iacampo[index])
            }
              
              
              
              
              
            }
          estado.playerpv-=estado.Iacampo[index].def - playerattack
          
          estado.cópia_do_Iacampo[index].defensemode = true
          estado.cópia_do_Iacampo[index].setado = false
          render_field()
        }
      })
    }
    
    
    if(estado.cópia_do_Iacampo[index].defensemode== true){
      let aifieldcards = document.createElement("img")
    console.log(estado.Iamao)
      aifieldcards.classList.add("Iacardset")
    aifieldcards.src = estado.Iacampo[index].card_images[0].image_url_small
      
      
      aicamp.appendChild(aifieldcards)
      aifieldcards.addEventListener("click",() =>{
        estado.botspelltrap_zone.forEach((pos,index) =>{
  if(estado.botspelltrap_zone[index].type =="Trap Card"){
    ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
    }
  }
  
  })
        
        
        if(playerattack > estado.Iacampo[index].def){
          
          estado.Iacampo.splice(index,1)
          estado.cópia_do_Iacampo.splice(index,1)
            render_field()
        }
        
        if(playerattack <= estado.Iacampo[index].def){
          estado.playerpv-=estado.Iacampo[index].def - playerattack
          
          
          render_field()
        }
      })
      console.log(estado.Iacampo) 
      
      
    }
})

    
  }
}
catch(error){
  
  return
}
}

document.addEventListener('DOMContentLoaded',() =>{
  
  
  
 
   

})
let JJ 
/*/
function support_phase(){

  if(turn.support_phase == true
&& !effects_rules.quantidade){
  if(estado.campo.length >=1){
  estado.campo.forEach((pos,index) =>{
    ativar_efeitos(estado.campo[index])
  })
  }
  turn.main_phase()
  turn.support_phase = false
    draw_cards()
  }
  if(effects_rules.quantidade<=4 && effects_rules.quantidade >0){
  if(turn.support_phase == true
){
  if(estado.campo.length >=1){
  estado.campo.forEach((pos,index) =>{
    ativar_efeitos(estado.campo[index])
  })
  }
  turn.main_phase()
  turn.support_phase = false
    draw_cards()
  }
  }
}
/*/
let newbotattack =0
let newplayerattack  =0
//arrumar um jeito de renderizar o campo da ia sem afetar o efeito do barrel dragon
let omegatimer = 0 
let alfatimer =0
let skateboard 
 async function Ia_main_phase(){
   
 
    
    render_field()
    
    
    
    
    
    
    //provável bug nas spells
    //multiplas chamadas no execute_effects
    await delay(700 +Math.floor(Math.random()*800) + 1)
    /*/forEach n presta se eu quiser fazer o sistema de trapa pegar 100%
    
    1.o for para quando o estado.Iamao[pos] é uma spell
    /*/
    for(let pos =estado.Iamao.length -1;pos>=0;pos--){
      let cardindex = pos
      
      
    console.log(`${estado.Iamao[pos].type} && ${estado.Iamao[pos].name}`)
    
      if(!estado.Iamao[pos]){
        continue
        
      }
    
      try{
      if(estado.Iamao[pos].type =="Trap Card"){
        estado.botspelltrap_zone.push(estado.Iamao[pos])
        estado.cópia_do_botspelltrap_zone.push({timer:turn.current,fieldtime:0,ativado:false})
        estado.Iamao.splice(pos,1)
      if(!estado.Iamao[pos]){
        continue
        
      }
    
        
      }
      
      
      
      
        
        
        
        
          if(estado.botspelltrap_zone.lenght <5){
      if(estado.Iamao[pos].type =="Spell Card" && estado.Iamao[pos].humanReadableCardType!=="Equip Spell"){
        
        
        effects_rules.bot =true
        ler_condição(estado.Iamao[pos])
        if(effects_rules.Aieffectscondition == true){
          
        let botspell = document.createElement("img")
      botspell.src = estado.Iamao[pos].card_images[0].image_url_small
      
      
      botspell.classList.add("fieldcards")
      
      
botstfield.appendChild(botspell)
ativar_efeitos(estado.Iamao[cardindex])
estado.Iamao.splice(pos,1)

for(let index = 0;index < estado.spelltrap_zone.length;index++){
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
  
  if(estado.spelltrap_zone[index].type =="Trap Card" &&effects_rules.effectscondition){
    
  await traps(index)
  
  effects_rules.player = false

  effects_rules.effectscondition = false
  
  }
  
}
render_field()
await delay(800)
botstfield.innerHTML =""

}

else if(effects_rules.Aieffectscondition == false){
  
  estado.botspelltrap_zone.push(estado.Iamao[pos])
      estado.cópia_do_botspelltrap_zone.push({timer:turn.current,fieldtime:0,equip:false})
      

estado.Iamao.splice(pos,1)


console.log(estado.botspelltrap_zone)

}
effects_rules.Aieffectscondition = false
      
        continue
      }
      
      
      
      if(estado.Iamao[pos].type =="Spell Card" &&estado.Iamao[pos].humanReadableCardType =="Equip Spell"){
        
        
        ler_condição(estado.Iamao[pos])
        if(effects_rules.Aieffectscondition == true){
        
      estado.botspelltrap_zone.push(estado.Iamao[pos])
      estado.cópia_do_botspelltrap_zone.push({timer:turn.current,fieldtime:0,equip:true,equipedmonster:"",equipedmonsterindex:0})
      
    
      effects_rules.botequipindex = estado.cópia_do_botspelltrap_zone.length-1
ativar_efeitos(estado.Iamao[cardindex])
estado.Iamao.splice(pos,1)

for(let index = 0;index<estado.spelltrap_zone.length;index++){
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
    if(estado.spelltrap_zone[index].type =="Trap Card"&&effects_rules.effectscondition){
      
  await traps(index)
  effects_rules.player = false
  effects_rules.effectscondition = false
    }
    
}


}

else if(effects_rules.Aieffectscondition == false){
  
estado.botspelltrap_zone.push(estado.Iamao[pos])
      estado.cópia_do_botspelltrap_zone.push({timer:turn.current,fieldtime:0,equip:false})
      

estado.Iamao.splice(pos,1)

}
effects_rules.Aieffectscondition = false

        continue
      }
}
}
catch(error){
  
  continue
}

    if(turn.Ia_main_phase && summons.normal_summon == false && estado.Iamao[pos].level <=4 && estado.Iacampo.length <5&& estado.Iamao[pos].atk >=estado.Iamao[pos].def &&estado.player_powerfull_monster <estado.Iamao[pos].atk){
    estado.Iacampo.push(estado.Iamao[cardindex])
    estado.cópia_do_Iacampo.push({setado:false,defensemode:false,timer:turn.current,fieldtime:0,atacou:false,limite:false,ativou:false})
    console.log(` carta removida =${estado.Iamao[pos].name}`)
    estado.Iamao.splice(pos, 1)
    
          summons.normal_summon = true
      for(let index = 0;index<estado.spelltrap_zone.length;index++){
        
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
    if(estado.spelltrap_zone[index].type =="Trap Card"&&effects_rules.effectscondition){
      
  await traps(index)
  
  effects_rules.player = false
  effects_rules.effectscondition = false
    }
    
    render_field()
    if(!estado.Iamao[pos]){
      continue
    }
}
        



      console.log(estado.Iamao)
      if(!estado.Iamao[pos]){
        continue
        
      }
      
    }
//talvez melhorar

    if(turn.Ia_main_phase && summons.normal_summon == false && estado.Iamao[pos].level <=4 && estado.Iacampo.length <5&&estado.player_powerfull_monster > estado.Iamao[pos].atk){
    estado.Iacampo.push(estado.Iamao[cardindex])
    estado.cópia_do_Iacampo.push({setado:true,defensemode:false,timer:turn.current,fieldtime:0,atacou:false,limite:false,ativou:false})
    console.log(` carta removida =${estado.Iamao[pos]}`)
    
    estado.Iamao.splice(pos, 1)
    
          for(let index = 0;index<estado.spelltrap_zone.length;index++){
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
    if(estado.spelltrap_zone[index].type =="Trap Card"&&effects_rules.effectscondition){
      
  await traps(index)
  effects_rules.player = false
  effects_rules.effectscondition = false
    }
    
}
  summons.normal_summon = true
      
      console.log(estado.Iamao)
      if(!estado.Iamao[pos]){
        continue
        
      }
    }
    
    //talvez fazer o flip de monstros de tributo
    for(let bastao=0;bastao< estado.Iacampo.length;bastao++){
     if(turn.Ia_main_phase && summons.normal_summon == false && estado.Iamao[pos].level >=5 &&estado.Iamao[pos].level <=6 &&estado.Iacampo.length >0
      && estado.Iamao[pos].atk > estado.Iacampo[bastao].atk && estado.playabletobot && estado.Iacampo[bastao].level <=4){
     
     estado.Iagraveyard.push(estado.Iacampo[
       bastao])
    estado.Iacampo.splice(bastao,1)
    estado.cópia_do_Iacampo.splice(bastao,1)
    estado.Iacampo.push(estado.Iamao[cardindex])
    estado.cópia_do_Iacampo.push({setado:false,defensemode:false,timer:turn.current,fieldtime:0,atacou:false,limite:false,ativou:false})
    
    for(let index = 0;index<estado.spelltrap_zone.length;index++){
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
    if(estado.spelltrap_zone[index].type =="Trap Card"&&effects_rules.effectscondition){
      
  await traps(index)
  effects_rules.player = false
  effects_rules.effectscondition = false
    }
    
}
    estado.Iamao.splice(pos,1)
    render_field()
    summons.normal_summon = true
    if(!estado.Iamao[pos]){
        continue
        
      }
    }
     
   if(turn.Ia_main_phase && summons.normal_summon == false && estado.Iamao[pos].level >=7 &&estado.Iacampo.length >2  && estado.Iamao[pos].atk > estado.Iacampo[bastao].atk &&estado.Iacampo[bastao].level <=4  && estado.playabletobot){
     
     estado.Iagraveyard.push(estado.Iacampo[bastao])
    estado.Iacampo.splice(bastao,2)
    estado.cópia_do_Iacampo.splice(bastao,2)
    
    estado.Iacampo.push(estado.Iamao[cardindex])
    estado.cópia_do_Iacampo.push({setado:false,defensemode:false,timer:turn.current,fieldtime:0,atacou:false,limite:false,ativou:false})
    
   
    
    for(let index = 0;index<estado.spelltrap_zone.length;index++){
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
    if(estado.spelltrap_zone[index].type =="Trap Card"&&effects_rules.effectscondition){
      
  await traps(index)
  effects_rules.player = false
  effects_rules.effectscondition = false
    }
    
}
estado.Iamao.splice(pos,1)
    render_field()
    summons.normal_summon = true
    if(!estado.Iamao[pos]){
        continue
              }
    }
     
    
      }
 
    console.log(`${estado.Iacampo.length} <=citiboy`)
    
    }
    
   
   
   
   render_field()
   
  


  
  await delay(700 +Math.floor(Math.random()*800) + 1)
  
  if(estado.Iacampo.length >=1&&turn.current >=2){
 turn.Ia_battle_phase = true
  }
  if(turn.Ia_battle_phase == true){
    alert("battle phase")
  await Ia_battle_phase()
    
    turn.Ia_battle_phase = false
  }
  
  render_field()
  
  
  
 await delay(700 +Math.floor(Math.random()*800) + 1)
   
  Aihand.innerHTML =''
  for(let i = 0;i < estado.Iamao.length ;i++){
    let nailon = document.createElement("img")
    nailon.src =" ygo backside.webp"
    nailon.classList.add("fieldcards")
    Aihand.appendChild(nailon)
  }
  for(let i =0;i <estado.cópia_do_botspelltrap_zone.length ;i++){
    estado.cópia_do_botspelltrap_zone[i].fieldtime +=1
    
  }
  for(let i =0;i <estado.cópia_do_campo.length ;i++){
    estado.cópia_do_Iacampo[i].fieldtime +=1
  }

  
  summons.normal_summon = false
  
  turn.Ia_main_phase= false  
  turn.main_phase = true  
  summons.normal_summon = false
  if(effects_rules.endturncondition !==""){
        clear_effect_rules()
        execute_conditions()
      }
      if(estado.Iamao.length >=7){
        descarte()
      }
      turn.player = true
      turn.bot = false
    playerdraw = 4
    turn.current+=1
    let turntxt = document.createElement("h2")

turntxt.textContent = turn.current
turntxt.classList.add("bigtext")
visualturn.innerHTML =""
visualturn.appendChild(turntxt)
if(estado.playerpv >0){
    sbuttons.innerHTML =""
}
    console.log(estado.Iamao)
  console.log(estado.mao)
alert(`turno atual: ${turn.current}`)
  render_field()
  for(let j= 0;j < estado.Iacampo.length;j++){
    estado.cópia_do_Iacampo[j].ativou = false
  }
  alert("End phase")
  render_field()
draw_cards()


  
   
   
   
}


//support_phase()





async function Ia_battle_phase(){
  
  console.log(estado.Iacampo)
  
  if(estado.spelltrap_zone.length >=1){
  for(let index = 0;index < estado.spelltrap_zone.length;index++){
  effects_rules.player = true
  ler_condição(estado.spelltrap_zone[index])
  
  if(estado.spelltrap_zone[index].type =="Trap Card" &&effects_rules.effectscondition){
    
  await traps(index)
  
  effects_rules.player = false

  effects_rules.effectscondition = false
  
  }
  }
}
    if(turn.Ia_battle_phase == true && turn.current >=2){
  for(let i =0;i<estado.Iacampo.length;i++){
console.log(`carta atacante =${estado.Iacampo[i].name}`)
  if(estado.campo.length <=0 && estado.cópia_do_Iacampo[i].setado == false && estado.cópia_do_Iacampo[i].defensemode == false && estado.cópia_do_Iacampo[i].atacou == false){
    estado.cópia_do_Iacampo[i].atacou = true
    estado.playerpv -= estado.Iacampo[i].atk
    
    
    
    if(estado.playerpv <=0){
      estado.playerpv =0
      alert("O bot venceu")
      estado.playerpv =0
      
      pv.textContent = estado.playerpv
  
  pv.classList.add("bigtext")
  pvp.appendChild(pv)
      await reset()
        
      
      
    }
    pv.textContent = estado.playerpv
  pvp.appendChild(pv)
  
  }
  for(let j =0;j <estado.campo.length;j++){
    
    //erro é que um loop trava o outro por isso i dentro do for j  é sempre 0
    




if(estado.cópia_do_Iacampo[i].defensemode == true || estado.cópia_do_Iacampo[i].setado == true){
    estado.cópia_do_Iacampo[i].atacou == true
    continue
  }
    
  if(estado.Iacampo[i].atk > estado.campo[j].atk &&estado.cópia_do_Iacampo[i].defensemode==false&& estado.cópia_do_Iacampo[j].setado == false&& estado.cópia_do_Iacampo[i].atacou == false && estado.cópia_do_campo[j].setado == false && estado.cópia_do_campo[j].defensemode == false){
  //melhorar
   
  
estado.cópia_do_Iacampo[i].atacou = true
console.log(estado.cópia_do_Iacampo)

    estado.playerpv -= estado.Iacampo[i].atk  - estado.campo[j].atk
    
    if(estado.playerpv <=0){
      estado.playerpv =0
      alert("O bot venceu")
      
       pv.textContent = estado.playerpv
  
  pv.classList.add("bigtext")
  pvp.appendChild(pv)
        await reset()
        render_field()
      draw_cards()
    }
  pv.textContent = estado.playerpv
  
  pv.classList.add("bigtext")
  pvp.appendChild(pv)
    
    
    estado.graveyard.push(estado.campo[j])
    estado.campo.splice(j ,1)
    estado.cópia_do_campo.splice(j ,1)
    
    
  
  }
  
  
else if(estado.Iacampo[i].atk == estado.campo[j].atk &&estado.cópia_do_Iacampo[i].defensemode==false&& estado.cópia_do_Iacampo[i].setado == false&& estado.cópia_do_Iacampo[i].atacou == false && estado.cópia_do_campo[j].setado == false && estado.cópia_do_campo[j].defensemode == false && estado.Iacampo.length>=2&& (estado.iacampo[i - 1].atk >= estado.playerpv || estado.iacampo[i + 1].atk >=estado.playerpv) && estado.Iacampo.length >=2){
  //melhorar
  
  
  
estado.cópia_do_Iacampo[i].atacou = true


    
  estado.campo.splice(j,1)
  estado.cópia_do_campo.splice(j,1)
  estado.Iacampo.splice(i,1)
  estado.cópia_do_Iacampo.splice(i,1)
  estado.graveyard.push(estado.campo[j])
  estado.Iagraveyard.push(estado.Iacampo[i])
  }
  
  
  
  else if(estado.Iacampo[i].atk <= estado.campo[j].atk &&estado.cópia_do_Iacampo[i].defensemode==false&& estado.cópia_do_Iacampo[i].setado == false&& estado.cópia_do_Iacampo[i].atacou == false && estado.cópia_do_campo[j].setado == false && estado.cópia_do_campo[j].defensemode == false){
  //melhorar
  
  //dar uma olhada nas traps da Ia(na hora de jogar elas)
  
  //nas tributes summons e no trechp abaixo
  
   estado.cópia_do_Iacampo[i].atacou = true
   
   if(estado.campo.length >=2&& estado.Iacampo[i].atk > estado.campo[j + 1].atk &&j< estado.campo.length){
       estado.cópia_do_Iacampo[i].atacou = false
       continue
   }
   
      /*/if(estado.Iacampo.length >=2 &&estado.Iacampo[i + 1].atk > estado.campo[j].atk  && i < estado.Iacampo.length){
        
  estado.cópia_do_Iacampo[i].atacou = false
  continue
}
/*/




    
  continue
  }

  
 else if(estado.Iacampo[i].atk <= estado.campo[j].def &&estado.cópia_do_Iacampo[i].defensemode==false&& estado.cópia_do_Iacampo[i].setado == false&& estado.cópia_do_Iacampo[i].atacou == false && estado.cópia_do_campo[j].setado == true){
  //melhorar
  
  
estado.cópia_do_Iacampo[i].atacou = true


    
  if(estado.cópia_do_campo[j].setado == true){
    
    effects_rules.classe = "flip"
    effects_rules.player = true
    estado.cópia_do_campo[j].defensemode = true
    estado.cópia_do_campo[j].atkmode = false
    estado.cópia_do_campo[j].setado = false
    
    console.log(estado.cópia_do_campo[j])
    render_field()
  await delay(1000)
  if(estado.campo[j].type =="Flip Effect Monster"){
    
    //o monstro ja foi flipado mecanica
  
    ler_condição(estado.campo[j])
    if(effects_rules.effectscondition){
      
    effects_rules.classe = "flip"
    effects_rules.player = true
      ativar_efeitos(estado.campo[j])
    }
  }
  }
  
  estado.botpv -=(estado.campo[j].def - estado.Iacampo[i].atk) 
  boga.textContent = estado.botpv
  boga.classList.add("bigtext")
  bvp.appendChild(boga)
  }
  
  
  
 else if(estado.Iacampo[i].atk > estado.campo[j].def &&estado.cópia_do_Iacampo[i].defensemode==false&& estado.cópia_do_Iacampo[i].setado == false&& estado.cópia_do_Iacampo[i].atacou == false && (estado.cópia_do_campo[j].setado == true || estado.cópia_do_campo[j].defensemode == true)){
  //melhorar
  
  
estado.cópia_do_Iacampo[i].atacou = true



    
 if(estado.cópia_do_campo[j].setado == true){
    
    effects_rules.classe = "flip"
    effects_rules.player = true
    estado.cópia_do_campo[j].defensemode = true
    estado.cópia_do_campo[j].setado = false
    estado.cópia_do_campo[j].atkmode = false
  await delay(500)
  render_field()
  await delay(500)
  if(estado.campo[j].type =="Flip Effect Monster"){
  ler_condição(estado.campo[j])
    if(effects_rules.effectscondition){
      effects_rules.classe = "flip"
    effects_rules.player = true
      ativar_efeitos(estado.campo[j])
    }
  }
  }
  
  estado.campo.splice(j,1)
  estado.cópia_do_campo.splice(j,1)
  estado.graveyard.push(estado.campo[j])
  }
  
  else{
    continue
  }
  
  
  
  }
  
  
  console.log(i)
  estado.cópia_do_Iacampo[i].atacou = true
  }
  


console.log(estado.cópia_do_Iacampo)
for(let h =0;h<estado.Iacampo.length;h++){
  
  
  if(estado.cópia_do_Iacampo[h].atacou == false){
    
    
    Ia_battle_phase()

  
  }
}

console.log(estado.cópia_do_Iacampo)

  for(let Aura = 0;Aura<estado.Iacampo.length;Aura++){
    
    
    if(estado.cópia_do_Iacampo[Aura].atacou == true){
    estado.cópia_do_Iacampo[Aura].atacou = false
    
    }
    else{
      continue
    }
  }
  
}



render_field()
return new Promise((resolve,reject) =>{
  render_field()
  resolve()
})

}

function ler_condição(card){
  
  let nome = card.name
  let efeito = conditions33[nome]
  
  if(efeito){
    efeito(card,estado)
  }
  else{
    
  }
}



function ativar_efeitos(card){
  
  let nome = card.name
  let efeito = effects[nome]
  
  if(efeito){
    efeito(card,estado)
  }
  else{
    
  }
}

let limitations = 0
let effect_monsters
//amanhã sistema de troca de fases.
let carlinhos_modo_rage = false
async function render_field(){
  try{
  
  aicamp.innerHTML =""
  
  botstfield.innerHTML =""
  estado.botspelltrap_zone.forEach(async(pos,index) =>{
    
    if(estado.botspelltrap_zone[index].type =="Spell Card" ){
    
    let downcard = document.createElement("img")
    downcard.src ="ygo backside.webp"
    botstfield.appendChild(downcard)
    downcard.classList.add("fieldcards")
    downcard.addEventListener("click",() =>{
      
      
      
      if(afeta_as_botst){
        effects_rules.player = true
        execute_conditions(index,effects_rules.tipo,effects_rules.quantidade,limitations)
      }
    })
    
    if(turn.Ia_main_phase){
      ler_condição(estado.botspelltrap_zone[index])
    if(effects_rules.Aieffectscondition){
    ativar_efeitos(estado.botspelltrap_zone[index])
    downcard.src =estado.botspelltrap_zone[index].card_images[0].image_url_small 
    await delay(500)
    estado.botspelltrap_zone.splice(index,1)
    estado.cópia_do_botspelltrap_zone.splice(index,1)
    }
    }
    
    
    
      
    
   
      if(estado.botstfield[index].humanReadableCardType =="Equip Spell"){
        ler_condição(estado.botspelltrap_zone[index])
        if(effects_rules.Aieffectscondition && estado.cópia_do_botspelltrap_zone[index].equip == false){
          ativar_efeitos(estado.botspelltrap_zone[index])
          estado.cópia_do_botspelltrap_zone[index].equip = true
          effects_rules.Aieffectscondition = false
        }
        if(estado.cópia_do_botspelltrap_zone[index].equip ==true){
        estado.cópia_do_botspelltrap_zone[index].equip = true
       downcard.src = estado.botspelltrap_zone[index].card_images[0].image_url_small
       downcard.classList.add("fieldcards")
       
botstfield.appendChild(downcard)

        }
        
        //acho que ta completo
if(estado.cópia_do_botspelltrap_zone[index].equipedmonster!==estado.campo[estado.cópia_do_botspelltrap_zone[index].equipedmonsterindex].name && estado.cópia_do_botspelltrap_zone[index].equipedmonsterindex == index && estado.botspelltrap_zone[index].equipedmonster!==""){
          estado.graveyard.push(estado.botspelltrap_zone[index])
          estado.botspelltrap_zone.splice(index,1)
          estado.cópia_do_botspelltrap_zone[index].splice(index,1)
        }        
      }
      

    
    
    }
    
    
    if(estado.botspelltrap_zone[index].type =="Trap Card"){
      
    let downcard = document.createElement("img")
    downcard.src ="ygo backside.webp"
    downcard.classList.add("fieldcards")
    botstfield.appendChild(downcard)
    downcard.addEventListener("click",() =>{
      if(afeta_as_botst){
        console.log(estado.botstfield[index])
        execute_conditions(index,effects_rules.tipo,effects_rules.quantidade,limitations)
      }
    })
    if(turn.current >estado.cópia_do_botspelltrap_zone[index].timer + estado.cópia_do_botspelltrap_zone[index].fieldtime && estado.cópia_do_botspelltrap_zone[index].ativado == false){
      effects_rules.bot = true
      ler_condição(estado.botspelltrap_zone[index])
      
      if(effects_rules.Aieffectscondition){
      ativar_efeitos(estado.botspelltrap_zone[index])
      estado.cópia_do_botspelltrap_zone[index].ativado = true
      
      await delay(500)
      estado.cópia_do_botspelltrap_zone.splice(index,1)
      estado.botspelltrap_zone.splice(index,1)
    }
    }
    }  
  })
  
  aicamp.innerHTML =""
  estado.Iacampo.forEach((pos,index) =>{
    if(turn.Ia_main_phase &&   carlinhos_modo_rage == false && estado.cópia_do_Iacampo[index].setado == false &&estado.cópia_do_Iacampo[index].defensemode == false &&estado.cópia_do_Iacampo[index].ativou == false){
      
    ler_condição(estado.Iacampo[index])
    
    if(effects_rules.effectscondition){
      ativar_efeitos(estado.Iacampo[index])
      effects_rules.effectscondition = false
    }
    estado.cópia_do_Iacampo[index].ativou = true
    if(effects_rules.sacrifice == true){
      estado.campo.splice(index,1)
    }
    
    carlinhos_modo_rage =true
    }
    
    if(effects_rules.afeta_o_oponente&& turn.Ia_main_phase){
     // execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
    }
    
    
            if(estado.cópia_do_Iacampo[index].setado == false &&estado.cópia_do_Iacampo[index].defensemode == false){
            
    let aifieldcards = document.createElement("img")
    
      
    aifieldcards.src =estado.Iacampo[index].card_images[0].image_url_small 
      
      aifieldcards.classList.add("cavalo")
      
      aicamp.appendChild(aifieldcards)
      
            
      
        
        aifieldcards.addEventListener("click",() =>{
          if(effects_rules.afeta_o_oponente == true && turn.main_phase){
            effects_rules.player = true
            
           execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
            
            
          }
        })
      
      
      if(turn.current > estado.cópia_do_Iacampo[index].timer + estado.cópia_do_Iacampo[index].fieldtime && turn.bot
      ){
        
        
        
        gamestatus()
        
        
        if(estado.player_powerfull_monster > estado.bot_powerfull_monster){
        estado.cópia_do_Iacampo[index].defensemode =true
        estado.cópia_do_Iacampo[index].setado = false
      estado.cópia_do_Iacampo[index].fieldtime = 0
        
        }
      }
      
      
            }
            
    if(estado.cópia_do_Iacampo[index].setado== true){
      let aifieldcards = document.createElement("img")
    console.log(estado.Iamao)
      aifieldcards.classList.add("Iacardset")
    aifieldcards.src ="ygo backside.webp"
      
      
      aicamp.appendChild(aifieldcards)
      console.log(estado.Iacampo) 
      
      if(turn.current > estado.cópia_do_Iacampo[index].timer + estado.cópia_do_Iacampo[index].fieldtime && turn.bot ){
        estado.cópia_do_Iacampo[index].defensemode = false
        estado.cópia_do_Iacampo[index].setado = false
        
        if(estado.Iacampo[index].type =="Flip Effect Monster"){
          ler_condição(estado.Iacampo[index])
          
          if(effects_rules.Aieffectscondition){
            ativar_efeitos(estado.Iacampo[index])
            
            effects_rules.Aieffectscondition = false
          }
        }
        
        
        
        
      
       
      }
      aifieldcards.addEventListener("click",() =>{
          
          
          
          if(effects_rules.afeta_o_oponente == true && turn.main_phase){
            
          execute_conditions(index)
          
          }
        })
      
    }
    
    if(estado.cópia_do_Iacampo[index].defensemode== true&& estado.cópia_do_Iacampo[index].setado == false){
      let aifieldcards = document.createElement("img")
    console.log(estado.Iamao)
      aifieldcards.classList.add("Iacardset")
    aifieldcards.src = estado.Iacampo[index].card_images[0].image_url_small
      
      
      aicamp.appendChild(aifieldcards)
      console.log(estado.Iacampo) 
      
        
        aifieldcards.addEventListener("click",() =>{
          
          if(effects_rules.afeta_o_oponente == true && turn.main_phase){
            effects_rules.bot = true
            
          execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
          
          }
        })
      
      if(turn.current > estado.cópia_do_Iacampo[index].timer + estado.cópia_do_Iacampo[index].fieldtime && turn.bot
      ){
        estado.cópia_do_Iacampo[index].defensemode =false
        estado.cópia_do_Iacampo[index].setado = false
        estado.cópia_do_Iacampo[index].fieldtime = 0
        console.log("mudou para o modo de ataque")
      }
    }
    
    })
    
    campo.innerHTML =""
  estado.campo.forEach((pos,index) =>{
    
  
      if(effects_rules.afeta_o_player ==true && turn.Ia_main_phase == true){
    
    //execute_conditions(index,effects_rules.tipo,effects_rules.quantidade,limitations)
  }
    
    
  if( estado.cópia_do_campo[index].atkmode){
  
    
    
    ler_condição(estado.campo[index])
    
    if(effects_rules.classe =="constante"){
      ativar_efeitos(estado.campo[index])
      effects_rules.classe =""
      effects_rules.effectscondition = false
    }
    let fieldcards = document.createElement("img")
    fieldcards.classList.add("fieldcards")
  
  
  fieldcards.src =estado.campo[index].card_images[0].image_url_small
  

campo.appendChild(fieldcards)
fieldcards.style.zIndex ="99999"
return new Promise((resolve,reject) =>{
  

fieldcards.addEventListener("click",async() =>{
  
  ler_condição(estado.campo[index])
  if(effects_rules.effectscondition){
    
    let activate = document.createElement("button")
  activate.textContent ="ativar efeito"
  sbuttons.appendChild(activate)
  activate.addEventListener("click",() =>{
    
    console.log(estado.campo[index].name)
  effects_rules.classe ="ativavel"
  
  ler_condição(estado.campo[index])
if(effects_rules.effectscondition){
  ativar_efeitos(estado.campo[index])
  effects_rules.effectscondition = false
}
console.log(estado.campo)
    console.log(estado.cópia_do_campo[index].limite)
    limitations = index
    if(effects_rules.sacrifice == true){
      estado.campo.splice(index,1)
    }
  })
  }
  console.log(effects_rules.effectscondition)
  if(effects_rules.afeta_o_player ==true){
    effects_rules.player = true
    effects_rules.bot = false
    if(effects_rules.tipo=="Equip"&& estado.campo[index].race== effects_rules.condição){
      
      estado.cópia_do_strap_zone[effects_rules.equipindex].equipedmonster=estado.campo[index].name
      
      estado.cópia_do_strap_zone[effects_rules.equipindex].equipedmonsterindex=index
      effects_rules.equipindex=98
      console.log(`${estado.cópia_do_strap_zone[effects_rules.equipindex].equipedmonster}`)
      
      execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
    }
    if(effects_rules.tipo!=="Equip"){
    execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
    
    
    }
  }
  if(turn.current > estado.cópia_do_campo[index].timer + estado.cópia_do_campo[index].fieldtime){
  let switchmodeatk = document.createElement("button")
  switchmodeatk.textContent ="mudar posição"
  
  sbuttons.appendChild(switchmodeatk)
  switchmodeatk.addEventListener('click',() =>{
    estado.cópia_do_campo[index].defensemode = true
    estado.cópia_do_campo[index].atkmode = false
    estado.cópia_do_campo[index].fieldtime =0
    estado.cópia_do_campo[index].timer =turn.current
    estado.cópia_do_campo[index].setado = false
    render_field()
  
  })
  }
})
})
}
  })
  
  
  for(let index =0;index<estado.campo.length;index++){
    if(estado.cópia_do_campo[index].setado == true ){
      
    let fieldcards = document.createElement("img")
  
  
  fieldcards.src = "ygo backside.webp"
  fieldcards.classList.add("cardset")
  

campo.appendChild(fieldcards)
fieldcards.style.zIndex ="99999"

fieldcards.addEventListener("click",() =>{
  if(turn.main_phase == true){
    if(effects_rules.afeta_o_player ==true && turn.main_phase == true){
      effects_rules.player = true
      effects_rules.bot = false
    execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
  }
  if(turn.current > estado.cópia_do_campo[index].timer  + estado.cópia_do_campo[index].fieldtime&&estado.cópia_do_campo[index].defensemode == false){
  
  console.log(estado.cópia_do_campo)
  let cagadaestrondosa = document.createElement("button")
  cagadaestrondosa.textContent ='flipar'
  sbuttons.appendChild(cagadaestrondosa)
  
  cagadaestrondosa.addEventListener("click",() =>{
    //melhorar
    
    estado.cópia_do_campo[index].setado = false
    estado.cópia_do_campo[index].defensemode = false
    estado.cópia_do_campo[index].atk = true
    render_field()
    sbuttons.innerHTML=""
    ler_condição(estado.campo[j])
    
    if(estado.campo[j].type =="Flip Effect Monster" &&effects_rules.effectscondition){
      effects_rules.player = true
    effects_rules.classe ="flip"
    ativar_efeitos(estado.campo[index])
    effects_rules.effectscondition = false
    }
    
    
  })
}
}
})
}
  }
  
  
  
  for(let index =0;index< estado.campo.length;index++){
    if(estado.cópia_do_campo[index].defensemode == true){
      
    let fieldcards = document.createElement("img")
  console.log(estado.campo)
  
  fieldcards.src = estado.campo[index].card_images[0].image_url_small
  fieldcards.classList.add("cardset")
  
console.log(estado.campo)
campo.appendChild(fieldcards)
fieldcards.style.zIndex ="99999"

fieldcards.addEventListener("click",() =>{
 let switchmodedef = document.createElement("button")
  switchmodedef.textContent ="Mudar posição"
  if(effects_rules.afeta_o_player ==true && turn.main_phase == true){
    effects_rules.player = true
    effects_rules.bot = false
    execute_effects(index,effects_rules.tipo,effects_rules.quantidade,limitations)
  }
  sbuttons.appendChild(switchmodedef)
  switchmodedef.addEventListener("click",() =>{
    if(turn.current > estado.cópia_do_campo[index].timer + estado.cópia_do_campo[index].fieldtime){
    estado.cópia_do_campo[index].defensemode = false
    estado.cópia_do_campo[index].atkmode = true
    
    estado.cópia_do_campo[index].fieldtime =0
    estado.cópia_do_campo[index].timer =turn.current
    
    estado.cópia_do_campo[index].setado = false
    render_field()
    }
  })
})
}
  }
  
  
  for(let index =0;index< estado.spelltrap_zone.length;index++ ){
    stfield.innerHTML =""
    //erro abaixo
    
    
  //equip bugado e crash no render_field
  
    let downcard = document.createElement("img")
    downcard.src ="ygo backside.webp"
    downcard.classList.add("fieldcards")
    stfield.appendChild(downcard)
  
   if(estado.spelltrap_zone[index].humanReadableCardType =="Equip Spell" && estado.cópia_do_strap_zone[index].equip==false){
    let downcard = document.createElement("img")
    downcard.src ="ygo backside.webp"
    downcard.classList.add("fieldcards")
    stfield.appendChild(downcard)
  }
    if(estado.spelltrap_zone[index].humanReadableCardType =="Equip Spell" && estado.cópia_do_strap_zone[index].equip == true){
        
        let spellimg =document.createElement("img")
        
        
    spellimg.src =estado.spelltrap_zone[index].card_images[0].image_url_small
    
    spellimg.classList.add("fieldcards")
    stfield.appendChild(spellimg)
  }
  
  if(estado.spelltrap_zone[index].humanReadableCardType =="Equip Spell" && estado.cópia_do_strap_zone[index].equip == true &&estado.cópia_do_strap_zone[index].equipedmonster!==estado.campo[estado.cópia_do_strap_zone[index].equipedmonsterindex].name&&index == estado.cópia_do_strap_zone[index].equipedmonsterindex &&estado.cópia_do_strap_zone[index].equipedmonster!==""){
    
    estado.graveyard.push(estado.spelltrap_zone[index])
  
    estado.spelltrap_zone.splice(index,1)
    estado.cópia_do_strap_zone.splice(index,1)
  }
    console.log(downcard)
    downcard.addEventListener("click",() =>{
      
      if(effects_rules.afeta_as_playerst){
        execute_conditions(index,effects_rules.tipo,effects_rules.quantidade,limitations)
      }
      ler_condição(estado.spelltrap_zone[index])
      if(effects_rules.effectscondition){
      let downactive = document.createElement("button")
    downactive.textContent ="ativar"
    sbuttons.innerHTML =""
  sbuttons.appendChild(downactive)
    downactive.addEventListener("click",async() =>{
      sbuttons.innerHTML =""
  
  if(estado.spelltrap_zone[index].type =="Spell Card" && estado.spelltrap_zone[index].humanReadableCardType !=="Equip Spell" ){
    
    
    clear_effect_rules()
  effects_rules.player = true
ativar_efeitos(estado.spelltrap_zone[index])


console.log(effects_rules.effectscondition)
  console.log(estado.campo)
  let spellimg = document.createElement("img")
  spellimg.src =estado.spelltrap_zone[index].card_images[0].image_url_small
  
   
 
 

spellimg.classList.add("fieldcards")
console.log(estado.campo)
stfield.innerHTML=""
stfield.appendChild(spellimg)
await delay(500)
estado.spelltrap_zone.splice(index,1)
estado.cópia_do_strap_zone.splice(index,1)

console.log(estado.spelltrap_zone)


effects_rules.effectscondition = false


await delay(500)


    
  }
  ler_condição(estado.spelltrap_zone[index])
    if(estado.spelltrap_zone[index].type =="Spell Card" && estado.spelltrap_zone[index].humanReadableCardType =="Equip Spell" ){
    
    
    clear_effect_rules()
  effects_rules.player = true
ativar_efeitos(estado.spelltrap_zone[index])


console.log(effects_rules.effectscondition)
  console.log(estado.campo)
  let spellimg = document.createElement("img")
  spellimg.src =estado.spelltrap_zone[index].card_images[0].image_url_small
  
   
 estado.cópia_do_strap_zone[index].equip = true
 

spellimg.classList.add("fieldcards")
console.log(estado.campo)
stfield.innerHTML=""
stfield.appendChild(spellimg)
await delay(500)

console.log(estado.spelltrap_zone)





await delay(500)

effects_rules.effectscondition = false
    
  }
  
  
  
  
  
  if(estado.spelltrap_zone[index].type =="Trap Card" &&turn.current >estado.cópia_do_strap_zone[index].timer + estado.cópia_do_strap_zone[index].fieldtime){
    
    
  effects_rules.activable = true
ativar_efeitos(estado.spelltrap_zone[index])
  console.log(estado.campo)
  spellimg.src =pos.card_images[0].image_url_small
  
  
 
 

spellimg.classList.add("fieldcards")
console.log(estado.campo)
stfield.appendChild(spellimg)

startimer = true
summons.type =""
estado.spelltrap_zone.splice(index,1)
estado.cópia_do_strap_zone.splice(index,1)
console.log(estado.spelltrap_zone)

    




    
  }
  
  
      if(estado.spelltrap_zone[index].humanReadableCardType =="Equip Spell"){
        ativar_efeitos(estado.spelltrap_zone[index])
        estado.spelltrap_zone[index].equip = true
      }
      


//estado.spelltrap_zone.splice(index,1)
//estado.cópia_do_strap_zone.splice(index,1)

console.log(estado.spelltrap_zone)
  
  
    })
      }
    })
      
    
    
  
    
    

  }
  
Player_gy.innerHTML =""
  estado.graveyard.forEach((pos, index) =>{
    
    let gyimg =document.createElement("img")
    gyimg.classList.add("fieldcards")
    gyimg.src =estado.graveyard[estado.graveyard.length - 1].card_images[0].image_url_small
    Player_gy.appendChild(gyimg)
    gyimg.addEventListener("click",() =>{
      for(let i =0;i < estado.graveyard.length;i++){
        if(estado.graveyard.length >1){
        alert(`${estado.graveyard[index].name},`)
        }
        else{
         alert(`${estado.graveyard[index].name} `)
        }
      }
    })
  })
  
  estado.Iagraveyard.forEach((pos,index) =>{
    bot_gy.innerHTML =""
    let gyimg =document.createElement("img")
    gyimg.classList.add("cavalo")
    
    gyimg.src =estado.Iagraveyard[estado.Iagraveyard.length - 1].card_images[0].image_url_small
    bot_gy.appendChild(gyimg)
    gyimg.addEventListener("click",() =>{
      alert(estado.Iagraveyard[index].name)
      
    })
  })
  }
  catch(error){
    
    console.error(error.stack)
    
    console.error(error)
    draw_cards()
  }
}


function execute_conditions(alvo,tipo,quantidade,limite2){
  
  //fazer todas as condições todas as condições todas TODAS!
  if(effects_rules.tipo =="alterar a ordem"){
    
    let clicks=0
    campo.innerHTML =""
    for(let i = estado.Player_Deck.length - 1; i>estado.Player_Deck.length -6;i--){
      
      
    let carlinhosimg = document.createElement("img")
    carlinhosimg.src =estado.Player_Deck[i].card_images[0].image_url_small 
    carlinhosimg.classList.add("fieldcards")
    
    campo.appendChild(carlinhosimg)
    carlinhosimg.addEventListener("click",() =>{
      estado.Player_Deck[estado.Player_Deck.length -(1 - clicks)] = estado.Player_Deck[i]
      
      
      clicks+=1
      alert(clicks)
      
      if(clicks >=5){
        
        
        if(turn.Ia_battle_phase){
          Ia_battle_phase()
        }
        if(turn.main_phase){
          main_phase()
        }
        
        if(turn.Ia_main_phase){
          Ia_main_phase()
        }
        render_field()
        campo.innerHTML =""
        
      }
    })
    }
    
  }
  
  
  if(effects_rules.tipo =="steal a monster"){
    execute_effects(alvo,effects_rules.tipo,effects_rules.quantidade,limitations)
  }
  if(effects_rules.condição =="spellcard"){
    if(estado.botspelltrap_zone[alvo].type =="Spellcard"){
    execute_effects(alvo,effects_rules.tipo,effects_rules.quantidade,limitations)
    }
  }
  if(effects_rules.condição =="flip"){
    
    if(effects_rules.condição2 =="def"){
      estado.cópia_do_Iacampo[alvo].setado = false
        
        estado.cópia_do_Iacampo[alvo].defensemode = true
        render_field()
      if(estado.Iacampo[alvo].def <=2000){
        
        
        
        
        execute_effects(alvo,effects_rules.tipo,effects_rules.quantidade,limitations)
      }
      else{
        return
      }
    }
    
  }
  
  
  
  if(effects_rules.condição =="sorteio"){
    if(effects_rules.condição2 =="3 moedas"){
      
      let moedas =[0,1,2]
    for(let i =0;i< moedas.length; i++){
      moedas[i] =Math.floor(Math.random()*2) + 1
        moedas.sort()
        console.log(i)
      console.log(moedas)
        if(moedas[i] == moedas[i - 1] && i ==2){
          alert("777")
          execute_effects(alvo,effects_rules.tipo,effects_rules.quantidade,limitations)
        }
        if(moedas[i] !==moedas[i - 1] && i ==2){
          alert("776")
        }
    }
     
      
    }
  }
  
  
}


function execute_effects(alvo,tipo,quantidade,limite2,user){
 // console.log(`${effects_rules.afeta_o_oponente} && ${effects_rules.afeta_o_player}`)
  
  
  if(tipo =="Buffdef" && effects_rules.bot == true){
    estado.Iacampo[alvo].def+=500
    effects_rules.bot = false
    effects_rules.ignition= false
    alert(estado.Iacampo[alvo].def)
  }
  
  if(tipo =="destruction" && turn.main_phase&&estado.cópia_do_campo[alvo].limite == false&&effects_rules.afeta_as_playerst == false&&effects_rules.afeta_as_botst == false){
    estado.Iacampo.splice(alvo,1)
    estado.cópia_do_Iacampo.splice(alvo,1)
    render_field()
    estado.cópia_do_campo[alvo].limite = true
    
    effects_rules.afeta_o_player =false
    effects_rules.afeta_o_oponente = false
    
  }
  
  if(tipo == "destruction" && effects_rules.afeta_as_playerst == true ||effects_rules.afeta_as_botst == true && (effects_rules.player == true)){
    estado.botspelltrap_zone.splice(alvo,1)
    estado.cópia_do_botspelltrap_zone.splice(alvo,1)
    
  }
  
  if(tipo == "destruction" && effects_rules.afeta_as_playerst == true ||effects_rules.afeta_as_botst == true && (effects_rules.player == true|| effects_rules.bot == true)){
    estado.spelltrap_zone.splice(alvo,1)
    estado.cópia_do_strap_zone.splice(alvo,1)
    
  }
  if(tipo =="Equip" && effects_rules.player == true && effects_rules.afeta_o_player){
  
  estado.campo[alvo].atk+=quantidade
  alert(estado.campo[alvo].atk)
  
  }
  
  if(tipo== "Equip" &&effects_rules.bot == true && effects_rules.afeta_o_bot){
    estado.Iacampo[alvo].atk+=quantidade
    
  }
  
  if(tipo =="destruction" && turn.Ia_main_phase&&estado.cópia_do_Iacampo[alvo].limite == false){
    estado.campo.splice(alvo,1)
    estado.cópia_do_Iacampo.splice(alvo,1)
    estado.cópia_do_Iacampo[alvo].limite = true
    effects_rules.afeta_o_player =false
    effects_rules.afeta_o_oponente = false
    render_field()
    
    

  }
  
  if(tipo =="Buffdef" && effects_rules.player == true){
    estado.campo[alvo].def+=500
    effects_rules.player = false
    effects_rules.afeta_o_oponente = false
    effects_rules.afeta_o_player = false
    alert(estado.campo[alvo].def)
    turn.pause = false
    effects_rules.ignition= false
    Ia_main_phase()
  }
  
  if(tipo =="switchmodedef" && effects_rules.player){
    estado.cópia_do_Iacampo[alvo].defensemode = true
    estado.cópia_do_Iacampo[alvo].timer = turn.current
    estado.cópia_do_Iacampo[alvo].fieldtime = 0
   
    effects_rules.classe =""
    effects_rules.afeta_o_oponente = false
    render_field()
  }
  
  if(tipo =="switchmodedef" && effects_rules.bot){
    estado.cópia_do_campo[alvo].defensemode = true
estado.cópia_do_campo[alvo].timer = turn.current
estado.cópia_do_Iacampo[alvo].fieldtime =0
    effects_rules.classe =""
    effects_rules.afeta_o_player = false
    render_field()
  }
  
  
  if(tipo =="destruction" && quantidade== 1 &&estado.cópia_do_campo[limite2].limite == false&& effects_rules.afeta_o_oponente == true){
    
    estado.graveyard.push(estado.campo[alvo])
estado.Iacampo.splice(alvo, 1)
estado.cópia_do_Iacampo.splice(alvo,1)
estado.cópia_do_campo[limite2].limite = true
render_field()
effects_rules.afeta_o_oponente = false
}
if(tipo =="destruction" && quantidade== 1 &&estado.cópia_do_campo[limite2].limite == false&& effects_rules.afeta_o_player == true){
  estado.graveyard.push(estado.campo[alvo])
  
 // estado.campo.splice(alvo, 1)
render_field()
}
if(tipo =="destruction blast"){
if(estado.Iacampo.atk<=1000 && rica <2){
  rica+=1
  execute_effects(alvo,tipo,quantidade,limite2)
  effects_rules.sacrifice = false
  effects_rules.afeta_o_oponente = false
}
  
  
}
if(tipo =="steal a monster" 
&& turn.main_phase){

  estado.campo.push(estado.Iacampo[alvo])
  estado.cópia_do_campo.push(estado.cópia_do_Iacampo[alvo])
  console.log(estado.campo)
  estado.Iacampo.splice(alvo,1)
  estado.cópia_do_Iacampo.splice(alvo,1)
  render_field()
  effects_rules.target = alvo

  effects_rules.afeta_o_oponente = false
}

if(tipo =="steal a monster" 
&& turn.Ia_main_phase){
effects_rules.target = alvo
  estado.Iacampo.push(estado.campo[alvo])
  estado.cópia_do_Iacampo.push(estado.cópia_do_campo[alvo])
  console.log(estado.campo)
  estado.campo.splice(alvo,1)
  estado.cópia_do_campo.splice(alvo,1)
  render_field()
  
  effects_rules.afeta_o_player= false
}

if(effects_rules.endturn =="return monster" && turn.player){
  estado.Iacampo.push(estado.campo[alvo])
  estado.cópia_do_Iacampo.push(estado.cópia_do_campo[alvo])
  estado.campo.splice(alvo,1)
  estado.cópia_do_Iacampo.splice(alvo,1)
  effects_rules.endturncondition=""
  effects_rules.target =""
}

if(effects_rules.endturn =="return monster" && turn.bot){
  estado.campo.push(estado.Iacampo[alvo])
  estado.cópia_do_campo.push(estado.cópia_do_Iacampo[alvo])
  
  estado.Iacampo.splice(alvo,1)
  estado.cópia_do_Iacampo.push(alvo,1)
  
  
  effects_rules.endturncondition=""
  effects_rules.target =""
}


if(tipo=="reduzir pv"){
  estado.campo.splice(alvo,1)
  estado.botpv-=500
  bvp.textContent = estado.botpv
  effects_rules.afeta_o_player = false
  render_field()
}
if(tipo =="reduzir pv heavy" && turn.main_phase){
  estado.botpv -=estado.campo[alvo].atk/2
  boga.textContent =estado.botpv
  bvp.appendChild(boga)
  estado.campo.splice(alvo,1)
  effects_rules.afeta_o_player = false
  render_field()
}

if(tipo =="reduzir pv heavy" && turn.Iamain_phase){
  estado.playerpv -=estado.Iacampo[alvo].atk/2
  pvp.textContent =estado.playerpv
  estado.Iacampo.splice(alvo,1)
  effects_rules.afeta_o_oponente = false
  render_field()
}

/*/effects_rules.afeta_o_oponente =true
    effects_rules.tipo ="steal a monster"
    effects_rules.quantidade =1
/*/
turn.pause = false
    estado.playabletobot = false
    render_field()
    main_phase()
    estado.playabletobot = true
clear_effect_rules()
carlinhos_modo_rage = false

}




//melhorar
function temporizador(ms){
  setTimeout(() =>{
    botstfield.innerHTML =""
    stfield.innerHTML =""
    draw_cards()
    render_field()
    
  },ms)
  
  return new Promise(carlinhos_solidario=>setTimeout(carlinhos_solidario,ms +10))
  
  
}

function finalizarSummon(carta, indexMao, setado ){
  if(setado == false){
  estado.campo.push(carta)

  estado.cópia_do_campo.push({
    limite:false,
    limitedataque:false,
    setado:setado,
    defensemode:false,
    timer:turn.current
    ,fieldtime:0,
    equiped:false,
    atkmode:true
    
  })

  estado.mao.splice(indexMao,1)
  summons.normal_summon = true
  render_field()
  }
  else{
    estado.campo.push(carta)

  estado.cópia_do_campo.push({
    limite:false,
    limitedataque:false,
    setado:setado,
    defensemode:false,
    timer:turn.current
    ,fieldtime:0,
    equiped:false,
    atkmode:false
  })

  estado.mao.splice(indexMao,1)
  summons.normal_summon = true
  render_field()
  }
}


/*/o que falta

/*/



async function traps(index){
  //melhorias
  //condição pra tivar e virar a trap
  
  sbuttons.innerHTML =""
  effects_rules.player = true
      alert("ativar efeito?")
      let activate = document.createElement("button")
      activate.textContent ="confirm"
      activate.style.background ="blue"
      activate.style.color ="white"
      activate.style.zIndex ="999999"
      let negate = document.createElement("button")
      negate.style.zIndex ="999999"
      negate.textContent ="negate"
      negate.style.background ="red"
      negate.style.color ="white"
      sbuttons.innerHTML =""
      
      
      sbuttons.appendChild(activate)
      sbuttons.appendChild(negate)
      //consertar isso aqui, o códifo deve esperar para depois retornar a promessa
      return new Promise((resolve, reject) => {
        //trocar spelltrap_zone por for em render_field
      activate.addEventListener("click",async() =>{
        sbuttons.innerHTML =""
        alert("escolha a carta armadilha que quer ativar")
        effects_rules.activable = true
        
      effects_rules.afeta_o_player =true
        
        await resolve_traps()
        estado.spelltrap_zone.splice(index,1)
        estado.cópia_do_strap_zone.splice(index,1)
        
       await delay(1000)
       stfield.innerHTML =""
       console.log(estado.spelltrap_zone)
       
       render_field()
        resolve()
        
      
        
      },{once:true})
      
      
      
      negate.addEventListener("click",async() =>{
    sbuttons.innerHTML =""
    
    
    
    
    resolve()
      })
      })
}

function clear_effect_rules(){
  effects_rules.afeta_o_player =false
  effects_rules.afeta_o_oponente =false
  effects_rules.tipo =""
  effects_rules.classe =""
  effects_rules.condição=""
  effects_rules.condição2 =""
  effects_rules.condição3 =""
  effects_rules.afeta_as_playerst = false
  effects_rules.afeta_as_botst = false
  effects_rules.bot = false
  effects_rules.player = false
  for(let i =0;i<estado.cópia_do_botspelltrap_zone.length;i++){
    estado.cópia_do_botspelltrap_zone[i].ativado = false
  }
  
  
}



async function descarte(){
  if(estado.mao.length >=7 && turn.player){
clearInterval(timerdrawcards)

  alert("descarte uma carta ")
  
    mao.innerHTML =""
    
    console.log(mao)
    return new Promise((resolve, reject) => {
  for(let index =0;index<estado.mao.length;index++){
  console.log(`${index} é ${Math.floor(Math.random()*100) + 1}% sigma`)

    
    
    
      
      console.log(estado.mao)
      
      
        let handimg4 =document.createElement("img")    
    handimg4.src =estado.mao[index].card_images[0].image_url_small 
    handimg4.style.zIndex ="99999999900000008999999"
    handimg4.classList.add("handcards")
    mao.appendChild(handimg4)
       
        console.log(handimg4)
        
    handimg4.addEventListener("click",() =>{
      
      estado.mao.splice(index,1)
      estado.graveyard.push(index)
   console.log(estado.mao)
   render_hand()
    timerdrawcards = setInterval(draw_cards,100)
      resolve()
      
    })
  }
      
  })
  

}

else{
  return new Promise((resolve, reject) => {
    resolve()
  })
}


if(estado.Iamao.length >=7&&turn.bot){
  let selectedcard = Math.floor(math.random()*estado.Iamao.length) + 1
  estado.Iagraveyard.push(estado.Iamao[selectedcard])
  render_field()
  estado.Iamao.splice(selectedcard, 1)
  
}
}


function render_hand(){
  estado.mao.forEach((pos,index) =>{
    let handimg =document.createElement("img")    
    handimg.src =estado.mao[index].card_images[0].image_url_small 
    
    handimg.classList.add("handcards")
    mao.appendChild(handimg)
  })
}
  let rica =0
  
  
  async function reset(){
  return new Promise((resolve, reject) =>{
    clearInterval(timerdrawcards)
    aicamp.innerHTML =""
    campo.innerHTML =""
    
 let resetgame = document.createElement("button")
    resetgame.classList.add("reset_bolado")
      resetgame.textContent ="resetar"
      sbuttons.appendChild(resetgame)
      
      console.log(campo)
      
        
      
      resetgame.addEventListener("click",() =>{
        
        
        cara_ou_coroa = Math.floor(Math.random() *2) + 1

        campo.innerHTML =""
        Aihand.innerHTML=""
        aicamp.innerHTML =""
        mao.innerHTML =""
        Player_gy.innerHTML =""
        bot_gy.innerHTML =""
        bvp.innerHTML=""
        pvp.innerHTML =""
        
        
        estado.campo.splice(0,estado.campo.length )
        estado.mao.splice(0,estado.mao.length - 1 )
        
        estado.Iacampo.splice(0,estado.Iacampo.length)
        estado.Iamao.splice(0,estado.Iamao.length)
        estado.graveyard.splice(0,estado.graveyard.length)
        estado.Iagraveyard.splice(0,estado.Iagraveyard)
        
        turn.current =0
       estado.playerpv =8000
       
       
       let turntxt = document.createElement("h2")

turntxt.textContent = turn.current
turntxt.classList.add("bigtext")
visualturn.innerHTML =""
visualturn.appendChild(turntxt)

       
       let pv = document.createElement("h2")
       pv.textContent = estado.playerpv
       pv.classList.add("bigtext")
  
  estado.botpv =8000
  let boga = document.createElement("h2")
  boga.textContent =estado.botpv
  boga.classList.add("bigtext")
  bvp.appendChild(boga)
    timerdrawcards = setInterval(draw_cards,100)
    playerdraw =0
    botdraw =0
    deckcards=40
    draw_cards()
        render_field()
        resolve()
      })
      })
    
  
  }
  /*/
  
  gg só falta tentar substituir ps forEachs de Ia_main_phase por for




  /*/
  
 async function delay(time){
    return new Promise(Tempo =>setTimeout(Tempo,time))
 }
  
  
function render(){
  estado.spelltrap_zone.forEach((pos,index) =>{
    let bostaliquida123 = document.createElement("img")
  
  bostaliquida123.src = pos.card_images[0].image_url_small
  stfield.appendChild(bostaliquida123)
  
  })
}


async function resolve_traps(){
  stfield.innerHTML =""
  for(let i = 0;i < estado.spelltrap_zone.length;i++){
    let handimg = document.createElement("img")
    
    handimg.src = "ygo backside.webp"
    
    handimg.classList.add("fieldcards")
    stfield.appendChild(handimg)
    
      
    return new Promise((resolve) =>{
    handimg.addEventListener("click",async() =>{
      ler_condição(estado.spelltrap_zone[i])
      handimg.src = estado.spelltrap_zone[i].card_images[0].image_url_small
        if(effects_rules.effectscondition){
          ativar_efeitos(estado.spelltrap_zone[i])
          
          
          estado.spelltrap_zone.splice(i,1)
          estado.cópia_do_strap_zone.splice(i,1)
          //""""""""""""funciona""""""""""" mas tem que ver pq n funciona direito o await render_field
          
          
          effects_rules.effectscondition = false
          
          resolve()
        }
    })
    })
  }
  
  
  
}


function gamestatus(){
  for(let i =1;i > estado.campo.length;i++){
    
    if(estado.campo.length >=2&& estado.campo[i].atk > estado.campo[i-1].atk){
      estado.player_powerfull_monster = estado.campo[i].atk
    }
    
    if(estado.campo.length <=1 && estado.campo.length >0){
     estado.player_powerfull_monster = estado.campo[0].atk
    }
  
    
  }
  
  for(let i =1;i < estado.Iacampo.length;i++){
    if(estado.Iacampo[i].atk > estado.Iacampo[i - 1].atk){
      
  estado.bot_powerfull_monster =estado.Iacampo[i].atk

    }
  
    
    
  }
  
  
  
}




   //