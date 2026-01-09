const fetch = require('node-fetch'); // Netlify 环境内置支持

exports.handler = async function(event, context) {
    // 从云端环境变量中读取密钥，不再硬编码
    const NETLIFY_TOKEN = process.env.MY_NETLIFY_TOKEN;
    const SITE_ID = process.env.MY_SITE_ID;

    try {
        const response = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`, {
            headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
        });
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};