
import requests
import time
from bs4 import BeautifulSoup
from tqdm import tqdm


def get_link(url):
#   while True:
     try:
        if url:
            headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
            page = requests.get(url,timeout = 2)
        else:
            headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
            page = requests.get(url,timeout=10)
        soup = BeautifulSoup(page.text, 'html.parser')
        
        images = soup.findAll('img',class_="basicImg")
        # images[0].find_all('td',attrs={'class':None})
        image = images[0]
        return(image['data-lazyurl'])
     except (IndexError, requests.exceptions.ReadTimeout,TypeError):
         print("error",url)



def get_address (url):
    try:
        if url:
            headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
            page = requests.get(url)
        else:
            headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
            page = requests.get(url)
        soup = BeautifulSoup(page.text, 'html.parser')
        
        images = soup.find('span',class_="restaurants-detail-overview-cards-LocationOverviewCard__detailLinkText--co3ei")
        for i in images:
            return i
 
    except (IndexError, requests.exceptions.ReadTimeout,TypeError):
         print("address",url)