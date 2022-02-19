export const sanitizeResponse = async (
    response: Response
): Promise<unknown> | never => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(await response.text());
    }
};