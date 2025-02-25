const { events, LinkedinScraper } = require("linkedin-jobs-scraper");

(async () => {
  // Programatically disable logger
  setTimeout(() => LinkedinScraper.disableLogger(), 5000);

  // Each scraper instance is associated with one browser.
  // Concurrent queries will be runned on different pages within the same browser instance.
  const scraper = new LinkedinScraper({
    headless: true,
    slowMo: 100 // used to be 10
  });

  var res = {
    table: []
  };

  // Listen for custom events
  scraper.on(
    events.custom.data,
    ({
      query,
      location,
      link,
      title,
      company,
      place,
      date,
      senorityLevel,
      jobFunction,
      employmentType,
      industries
    }) => {
      res.table.push({
        query: query,
        location: location,
        title: title,
        company: company,
        place: place,
        date: date,
        // description: description,
        link: link,
        senorityLevel: senorityLevel,
        function: jobFunction,
        employmentType: employmentType,
        industries: industries
      });
    }
  );

  scraper.on(events.custom.error, err => {
    console.error(err);
  });
  scraper.on(events.custom.end, () => {
    console.log("All done!");
    let fs = require("fs");
    let time = '{"time" : ' + '"' + new Date().toLocaleString() + '",';
    fs.writeFile(
      "public/linkedin_intern_output.json",
      time + '"data" : ' + JSON.stringify(res.table) + "}",
      "utf8",
      () => {}
    );
  });

  // Listen for puppeteer specific browser events
  scraper.on(events.puppeteer.browser.targetcreated, () => {});
  scraper.on(events.puppeteer.browser.targetchanged, () => {});
  scraper.on(events.puppeteer.browser.targetdestroyed, () => {});
  scraper.on(events.puppeteer.browser.disconnected, () => {});

  // This will be executed on browser side

  // Run queries concurrently
    await Promise.all([
        scraper.run("développeur backend", "Toulouse", {
            paginationMax: 2
        }),
        scraper.run("développeur frontend", "Toulouse", {
            paginationMax: 2
        }),
        scraper.run("développeur web", "Toulouse", {
            paginationMax: 2
        }),
        scraper.run("osint", "Toulouse", {
            paginationMax: 2
        }),
        scraper.run("forensic", "Toulouse", {
            paginationMax: 2
        }),
        scraper.run("administrateur système", "Toulouse", {
            paginationMax: 2
        }),
        scraper.run("devops", "Toulouse", {
            paginationMax: 2
        })
    ]);

  // Close browser
  await scraper.close();
})();
