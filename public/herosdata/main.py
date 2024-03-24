"""
获取opgg上英雄数据，保存至src/data/herosdata.json
实际服务时，每次启动项目均先运行一次本程序
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json

def gethtml():
    url="https://www.op.gg/champions"
    soup = ""
    try:
        options = webdriver.EdgeOptions()
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument("--disable-infobars")
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
        print("prepare")
        driver.get(url)
        print("send GET successful")
        html=driver.page_source
        print("get html source")
        soup=BeautifulSoup(html, "html.parser")
    except:
        soup="try error"
    return soup

def main():
    soup=gethtml()
    if soup:
        txt=soup.findAll(name='script',attrs={'id' :"__NEXT_DATA__"},)
        txtstring=txt[0].string
        data=json.loads(txtstring)
        herosdata={"championMetaList":data["props"]["pageProps"]["championMetaList"]}

        # print(type(herosdata))
        # with open("./dist/herosdata.json","w+",encoding='utf-8') as savefile:
        with open("./public/herosdata.json","w+",encoding='utf-8') as savefile:
            json.dump(herosdata,savefile, indent=2, sort_keys=True, ensure_ascii=False)
    else:
        print("error")



if __name__ == '__main__':
    main()

