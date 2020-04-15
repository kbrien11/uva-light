from hashlib import sha512
import requests
from bs4 import BeautifulSoup


def hash_pass(password, salt="SALT"):
    new_pw = password + salt
    hashed_pw = sha512(new_pw.encode()).hexdigest()
    return hashed_pw



def get_links(url):
    if url:
        headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
        page = requests.get(url)
    else:
        headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'}
        page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    
    images = soup.findAll('img',class_="basicImg")
    image = images[0]
  
   
    
    return(image['data-lazyurl'])
    
 