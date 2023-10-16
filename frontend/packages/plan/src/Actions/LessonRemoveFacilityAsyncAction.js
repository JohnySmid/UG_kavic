import { authorizedFetch } from "@uoisfrontend/shared"
import All from "@uoisfrontend/shared/src/keyedreducers"

export const LessonRemoveFacilityQueryJSON = ({lesson_id, facility_id}) => ({
    query: `mutation($facility_id: ID! $lesson_id: ID!) {
      result: plannedLessonFacilityDelete(facilitylesson: {facilityId: $facility_id, planlessonId: $lesson_id }) {
        id
        msg
        lesson {
            plan {
                __typename
                id
                lastchange
                lessons {
                    __typename 
                    id
                    name
                    lastchange
                    order
                    length
                    type { id name }
                    users {
                        __typename
                        id
                        name
                        surname
                        email
                    }
                    groups {
                        __typename
                        id
                        name
                    }
                    facilities {
                        __typename
                        id
                        name
                        label
                    }
                }
            }
        }
      }
    }`,
    variables: {lesson_id, facility_id}
})

export const LessonRemoveFacilityQuery = ({facility_id, lesson_id}) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(LessonRemoveFacilityQueryJSON({lesson_id, facility_id})),
    })

export const LessonRemoveFacilityAsyncAction = ({facility_id, lesson_id}) => (dispatch, getState) => {
    return (
      LessonRemoveFacilityQuery({facility_id, lesson_id})
        .then(response => response.json())
        .then(
            json => {
                const result = json?.data?.result
                if (result) {
                    const plan = result.lesson.plan
                    const action = All.ItemSliceActions.item_update(plan)
                    dispatch(action)
                }
                return json
            }
        )
    )
}
