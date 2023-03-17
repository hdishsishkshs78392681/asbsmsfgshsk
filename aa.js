const {Telegraf} = require('telegraf');
const {DownloaderHelper} = require('node-downloader-helper');
const crypto = require('crypto');
const fs = require('fs');

const bot = new Telegraf('6133309474:AAFGn2jXBv-s15ViGfhObdn0falz-68ires')

const cid = -1001839245445;
let mid;


bot.command('start',ctx=>{
  
    ctx.reply('Welcome to this bot.You can mirror any file with this bot.\n\nDeveloped By Zubayer Ahmed\nDeveloper\'s Channel:@techzbd');
  
})

bot.command('mirror',async (ctx)=>{
  if(ctx.chat.id === cid){
    const link = ctx.message.text.replace('/mirror ','');
    if(link !== '/mirror' && link !== ''){
      if(link.includes('http://') || link.includes('https://')){
        const tk = crypto.randomBytes(5).toString('hex');
        fs.mkdirSync(tk);
        const d = new DownloaderHelper(link,'./'+tk)
        
        d.on('download',async a=>{
          const fn = a.fileName;
          const abc = await bot.telegram.sendMessage(ctx.chat.id,`File:${fn}\nRequested By:@${ctx.from.username}\n\nDownloading...`)
          mid = await abc.message_id
        })
        d.on('end',aa=>{
          const fname = aa.fileName;
          const ff = fs.readFileSync('./'+tk'/'+fname)
          bot.telegram.sendDocument(ctx.chat.id,ff,{caption:`Requested By:@${ctx.from.username}\n\n\nTG Mirror Bot:@tgmirror0bot`}).then(x=>{
          bot.telegram.deleteMessage(ctx.chat.id,mid)
        })
        })
        d.start().catch(e=>{
          console.log(e)
        })
      }
      else{
        ctx.reply('Invalid Link')
      }
    }
    else{
      ctx.reply('Please Enter Your File Link')
    }
  }
  else{
    ctx.reply('Please Join:@tgmirror0botgrp\nYou can only mirror your files in this group')
  }
})


bot.launch()
