"""
获取opgg上英雄胜率，保存至public/winrates.json（dist/winrates.json）
实际服务时，每次启动项目均先运行一次本程序
"""
import random
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json

def getcounter(heroname):
    url="https://www.op.gg/champions/"+heroname+"/counters"
    soup = ""
    try:
        options = webdriver.EdgeOptions()
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument("--disable-infobars")
        options.add_argument('--incognito')
        prefs = {
                'profile.default_content_setting_values': {
                    'images': 2,
                    'permissions.default.stylesheet':2,
                    'javascript': 2
                }
            }
        options.add_experimental_option('prefs', prefs)
        # options.headless = True
        driver = webdriver.Edge(options=options)
        driver.minimize_window()
        print("prepare for "+heroname)
        driver.get(url)
        print("send GET successful")
        html=driver.page_source
        print("get html source")
        soup=BeautifulSoup(html, "html.parser")
    except:
        soup="try error"
    return soup

def main():
    with open("./public/herosdata.json","r",encoding='utf-8') as namefile:
        content = namefile.read()
        heronames = json.loads(content)
        namefile.close()
    herolist=heronames["championMetaList"]
    num=len(herolist) 
    winratesavelist={}
    for i in range(num):
        sleeptime=random.randint(50,2000)/1000
        print("hero:"+str(i)+"/"+str(num)+", sleep:"+str(sleeptime))
        time.sleep(sleeptime)

        name=herolist[i]["key"]
        soup=getcounter(name)
        winratelist=[]
        if soup != "try error":
            txt=soup.findAll(name='script',attrs={'id' :"__NEXT_DATA__"},)
            txtstring=txt[0].string
            data=json.loads(txtstring)
            herosdata=data["props"]["pageProps"]["data"]["summary"]["counters"]
            for j in range(len(herosdata)):
                winrate=herosdata[j]["win"]/herosdata[j]["play"]
                winratelist.append({herosdata[j]["meta"]["key"].lower():winrate})
        winratesavelist[name]=winratelist
    winratesave={"winrate":winratesavelist}
    with open("./public/winrate.json","w+",encoding='utf-8') as savefile:
        json.dump(winratesave,savefile, indent=2, sort_keys=True, ensure_ascii=False)
        savefile.close()
main()  