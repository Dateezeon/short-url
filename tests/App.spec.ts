import { test, expect } from "@playwright/test";

const endpoint = "**/links";

let mock = [
  {
    url: "http://www.test.com",
    slug: "1111",
    short_url: "http://bely.me/1111",
  },
  {
    url: "http://www.test2.com",
    slug: "2222",
    short_url: "http://bely.me/2222",
  },
  {
    url: "http://www.test3.com",
    slug: "3333",
    short_url: "http://bely.me/3333",
  },
];

test.beforeEach(async ({ page }) => {
  await page.route(endpoint, (route) =>
    route.fulfill({
      headers: {
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(mock),
    })
  );
  await page.goto("http://localhost:3000");
  page.waitForTimeout(5000);
});

test("title rendered", async ({ page }) => {
  const name = await page.innerText(".Title");
  expect(name).toBe("Short URL");
});

test("table rendered", async ({ page }) => {
  const url = await page.innerText("data-test-id=table-header-url");
  expect(url).toBe("Original");
  const shortURL = await page.innerText("data-test-id=table-header-short_url");
  expect(shortURL).toBe("Shortened");
  const dataURL = await page.innerText("data-test-id=table-data-url-0");
  expect(dataURL).toBe("http://www.test.com");
  const dataShortURL = await page.innerText(
    "data-test-id=table-data-short_url-0"
  );
  expect(dataShortURL).toBe("http://bely.me/1111");
});

test("url submits correctly", async ({ page }) => {
  await page.click('[placeholder="Enter URL"]');
  await page.fill('[placeholder="Enter URL"]', "http://www.test4.com");
  await page.route(endpoint, (route) => {
    const method = route.request().method();
    expect(method).toBe("POST");
    const postData = route.request().method();
    expect(postData).toBe('{"url":"http://www.test4.com"}');
  });
  await page.click("text=Shorten URL");
});

test("url deletes correctly", async ({ page }) => {
  await page.route(endpoint, (route) => {
    const method = route.request().method();
    expect(method).toBe("DELETE");
    const url = route.request().method();
    expect(url).toBe("https://api.bely.me/links/1111");
  });
  await page.click('[data-test-id="table-data-delete-0"]');
});
