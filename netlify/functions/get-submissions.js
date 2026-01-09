exports.handler = async function(event, context) {
    const NETLIFY_TOKEN = process.env.MY_NETLIFY_TOKEN;
    const SITE_ID = process.env.MY_SITE_ID;

    try {
        // 直接调用全局 fetch
        const response = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`, {
            headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
        });
        
        if (!response.ok) {
            throw new Error(`Netlify API 返回错误: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            // 必须进行跨域设置，否则 admin.html 无法读取
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.error("函数执行出错:", err);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: err.message }) 
        };
    }
};