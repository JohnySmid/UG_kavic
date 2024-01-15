from .gt_utils import (
    createByIdTest, 
    createPageTest, 
    createResolveReferenceTest, 
    createFrontendQuery, 
    createUpdateQuery
)

test_group_by_id = createByIdTest(tableName="groups", queryEndpoint="groupById")
test_group_page = createPageTest(tableName="groups", queryEndpoint="groupPage")
test_group_reference = createResolveReferenceTest(tableName="groups", gqltype="GroupGQLModel")

test_group_update = createUpdateQuery(tableName="groups", query="""mutation ($id: UUID!, $lastchange: DateTime!, $name: String!) {
  result: groupUpdate(group: {id: $id, lastchange: $lastchange, name: $name}) {
    id
    group {
      name
      lastchange
      email
    }
  }
}""", variables={"id": "2d9dcd22-a4a2-11ed-b9df-0242ac120003", "name": "newname"})

test_group_insert = createFrontendQuery(query="""mutation ($id: UUID, $name: String!, $grouptype_id: UUID!) {
  result: groupInsert(group: {id: $id, name: $name, grouptypeId: $grouptype_id }) {
    id
    group {
      name
      lastchange
      valid
    }
  }
}""", variables={"id": "850b03cf-a69a-4a6c-b980-1afcf5be174b", "name": "newname", "grouptype_id": "cd49e157-610c-11ed-9312-001a7dda7110"})