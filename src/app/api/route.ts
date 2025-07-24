import {pgPool} from "@/lib/db";

export async function GET() {
    const result = await pgPool.query("SELECT NOW();")
    return Response.json({
        data: result.rows
    })
}
