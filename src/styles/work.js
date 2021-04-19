import styled from "styled-components"

export const ProjectSection = styled.section``

export const TitleContainer = styled.span`
  font-family: WorkSans-SemiBold;
  font-size: 30px;
  margin-top: 19.5px;
  margin-bottom: 20px;
  display: flex;
`
export const ProjectNumber = styled.span`
  margin-right: 20px;
  text-decoration: none;
  color: ${(prop) =>
    prop.hover ? "var(--color-black)" : "var(--color-light-gray)"};
`

export const Title = styled.div`
  color: ${(prop) =>
    prop.hover ? "var(--color-blue)" : "var(--color-light-gray)"};
  text-decoration: ${(prop) => (prop.hover ? "underline" : "none")};
  margin-right: 10px;
`

export const Arrow = styled.div`
  color: ${(prop) =>
    prop.hover ? "var(--color-blue)" : "var(--color-light-gray)"};
`

export const BodyInner = styled.div`
  margin-left: 50px;
`

export const Heading = styled.div`
  font-family: Montserrat-Bold;
  font-size: 36px;
  color: var(--color-black);
  margin-bottom: 50px;
`

export const BodyText = styled.div`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  margin-bottom: 22px;
  color: ${(prop) =>
    prop.hover ? "var(--color-black)" : "var(--color-light-gray)"};
`

export const TagList = styled.ul`
  padding: 0 10px;
  margin-left: 0;
  margin-bottom: 18px;
  border-radius: ${(prop) => (prop.hover ? "5px" : null)};
  background-color: ${(prop) => (prop.hover ? "#f9f5f3" : null)};
`

export const TagItem = styled.li`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  color: ${(prop) =>
    prop.hover ? "var(--color-gray)" : "var(--color-light-gray)"};
  display: inline;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border: solid 1px #ece3e0;
`

