async function scrapdata()
{
const response = await fetch("https://www.relaischateaux.com/fr/update-destination-results",{
		"credentials" : "include",
		"headers" : {
			"accept": "/",
			"accept-language": "fr-FR,fr;q=0.9,en=US;q=0.8,en;q=0.7",
			"cache-control":"no-cache",
			"content-type":"application/x-www-form-urlencoded; charset=UTF-8",
			"pragma": "no-cache",
			"x-requested-with":"XMLHttpRequest"
		},
		"refferer":"https://www.relaischateaux.com/us/destinations/europe/france",
		"reffererPolicy": "origin-when-cross-origin",
		"body":"page=1&areaId=78",
		"method":"POST",
		"mode":"cors"
	})
	const $ = cheerio.load(response);
	console.log(await response.json());
}

