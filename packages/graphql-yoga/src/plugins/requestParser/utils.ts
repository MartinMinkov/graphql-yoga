import { GraphQLParams } from '../../types.js'

export function parseURLSearchParams(requestBody: string): GraphQLParams {
  const searchParams = new URLSearchParams(requestBody)
  const operationName = searchParams.get('operationName') || undefined
  const query = searchParams.get('query') || undefined
  const variablesStr = searchParams.get('variables') || undefined
  const extensionsStr = searchParams.get('extensions') || undefined
  return {
    operationName,
    query,
    variables: variablesStr ? JSON.parse(variablesStr) : undefined,
    extensions: extensionsStr ? JSON.parse(extensionsStr) : undefined,
  }
}

export function isContentTypeMatch(
  request: Request,
  expectedContentType: string,
): boolean {
  let contentType = request.headers.get('content-type')

  // a list of content-types is not valid as per HTTP spec, but some clients dont care
  contentType = contentType?.split(',')[0] || null

  return (
    contentType === expectedContentType ||
    Boolean(contentType?.startsWith(`${expectedContentType};`))
  )
}
