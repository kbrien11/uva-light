
import requests
from bs4 import BeautifulSoup




def get_link(url):
#   while True:
    try:
        if url:
            headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
            page = requests.get(url,timeout=2)
        else:
            headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
            page = requests.get(url,timeout=2)
        soup = BeautifulSoup(page.text, 'html.parser')
        
        images = soup.findAll('img',class_="basicImg")
        for image in images:
          return(image['data-lazyurl'])

    except (IndexError, requests.exceptions.ReadTimeout):
        print("error",url)
        # continue
