// netlify/functions/delete-submission.js

exports.handler = async function(event, context) {
    // 基础安全检查：只允许 POST 请求
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { submissionId } = JSON.parse(event.body);
    const NETLIFY_TOKEN = process.env.MY_NETLIFY_TOKEN;

    try {
        // 调用 Netlify 官方 API 执行删除操作
        const response = await fetch(`https://api.netlify.com/api/v1/submissions/${submissionId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
        });

        if (!response.ok) {
            throw new Error(`删除失败: ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "删除成功" })
        };
    } catch (err) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: err.message }) 
        };
    }
};