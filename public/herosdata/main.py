"""
获取opgg上英雄数据，保存至src/data/herosdata.json
实际服务时，每次启动项目均先运行一次本程序
"""
from urllib import request
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import json

def gethtml():
    url="https://www.op.gg/champions"
    hdr={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}
    soup = ""
    act=0
    try:
        print("111")
        r=Request(url,headers=hdr)
        html=request.urlopen(r)
        print("222")
        if html.getcode() == 200:
            soup=BeautifulSoup(html, "html.parser")
            act=1
        else:
            soup=html.getcode()
    except():
        soup="try error"
    return soup,act

def main():
    soup,act=gethtml()
    if act:
        txt=soup.findAll(name='script',attrs={'id' :"__NEXT_DATA__"},)
        txtstring=txt[0].string
        data=json.loads(txtstring)
        herosdata={"championMetaList":data["props"]["pageProps"]["championMetaList"]}

        # print(type(herosdata))
        with open("./public/herosdata.json","w+",encoding='utf-8') as savefile:
            json.dump(herosdata,savefile, indent=2, sort_keys=True, ensure_ascii=False)

    else:
        print(soup)

if __name__ == '__main__':
    main()

