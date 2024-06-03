	    })
})

// AZƏRBAYCAN GRUP DÜYMƏLƏRİ
bot.action('UK', ctx=>{
    ctx.deleteMessage()
    ctx.replyWithMarkdown(`*Kanallar 💞*`,{
        reply_markup:{
            inline_keyboard:[
                [{text:'1) Ｒｉｙａｄ & Kanal🇬🇪 ', url:'https://t.me/riyaddblogg'}],
                [{text:'2) 𝐓𝐮𝐫𝐚𝐥 & kanal🇦🇿 ', url:'https://t.me/TuralBlogg'}],
		[{text:'3) 𝐓𝐮𝐫𝐚𝐥 & 𝐅𝐚𝐦𝐢𝐥𝐲🇦🇿  ', url:'https://t.me/sohbetnezrin'}],    
                [{text:'🔙 Geri', callback_data:'vip'}]
            ]
        }
    })
})

/// /// /// /// /// /// ///  <!-- BOT START MENÜ SON --> /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 





bot.on("message", async (ctx) => {
	let message = ctx.update.message
	if (message.chat.id < 0) {
		let chatId = message.chat.id
		let fromId = message.from.id
		let chat = getChat(chatId)
		if (
			chat && 
			chat.isPlaying && 
			(chat.members[fromId] === undefined || chat.members[fromId].answer === null) && 
			oyunDurumuHusnuEhedov && 
			/^-?\d+$/.test(message.text)
		) {
			let firstName = message.from.first_name
			let answer = Number(message.text)
			if (answer <= 0 || answer > 100) {
				return ctx.reply(
					"Cavab limiti. (1 - 100)",
					{
						reply_to_message_id: ctx.message.message_id,
					}
				)
			}
			if (!chat.members[fromId]) { 
				chat.members[fromId] = dbUserAlHusnuEhedov(firstName)
			}
			Object.assign(chat.members[fromId], {
				isPlaying: true,
				answer: answer,
				firstName: firstName
			})
			oyunDurumuHusnuEhedov[chatId].answersOrder.push(fromId)

			db.update(chatId, ch => chat)

			telegram.editMessageCaption(
				chatId,
				oyunDurumuHusnuEhedov[chatId].guessMessageId,
				null,
				RaundMesajHusnuEhedov(chatId, oyunDurumuHusnuEhedov[chatId].currentRound, oyunDurumuHusnuEhedov[chatId].currentTime),
				{
					parse_mode: "Markdown"
				}
			)
		}
		else if (message.new_chat_member && message.new_chat_member.id === process.env.ID_BOT) { /// Bot Yeni Qruba Eklendi Mesaj
			ctx.replyWithMarkdown(ozelMesaj(true))
		}
	}
})


// Olumsuz Hata versede çalışmaya devam eder
bot.catch((err) => {djdjjd
    console.log('Error: ', err)nsjsns
})

// Botun nickname alan kod
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
    console.log(`Sistem Aktifleşti => ${bot.options.username}`)
})

bot.launch();
