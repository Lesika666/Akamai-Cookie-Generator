from playwright.sync_api import sync_playwright
import json

url = ("https://www.yeezysupply.com/")


def main():
    with sync_playwright() as p:
        browser = p.webkit.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto(url)
        page.wait_for_timeout(3000)
        cookies = context.cookies()
        browser.close()
        data = json.dumps(cookies)
        new_data = json.loads(data)
        for abck_cookie in new_data:
            if abck_cookie['name'] == '_abck':
                with open("cookies.txt", 'a') as af:
                    af.write('\n' + abck_cookie['value'])
                    print(abck_cookie['value'])
        print('Generated Akamai _abck Cookies ! ')
main()
