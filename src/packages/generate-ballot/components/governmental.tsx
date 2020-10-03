import React from "react"

import * as Ballot from "./sections/index"

import { VotesCoordinates } from "../types/ballot-machine"
import {
  BallotStructure,
  Party,
  Candidate,
  Header,
  Rule,
  WriteInCandidate,
  EmptyCandidacy,
} from "../../practica/services/ballot-structures"

type BallotProps = {
  structure: BallotStructure
  votes: VotesCoordinates[]
  toggleVote: ({ row, column }: VotesCoordinates) => void
}

export default function GovernmentalBallot({
  structure,
  votes,
  toggleVote,
}: BallotProps) {
  return (
    <div className="bg-black" style={{ width: 2200 }}>
      {structure.map(
        (row: Party[] | Rule[] | Candidate[] | Header[], rowIndex: number) => {
          return (
            <div
              key={`state-ballot-${rowIndex}`}
              className={`grid grid-cols-${row.length} ${
                rowIndex !== 0 ? "bg-ballots-governmental" : ""
              }`}
            >
              {row.map(
                (col: Party | Rule | Candidate | Header, colIndex: number) => {
                  const vote = !!votes.find(vote => {
                    return vote.row === rowIndex && vote.column === colIndex
                  })

                  if (col instanceof Party) {
                    return (
                      <Ballot.PartyHeader
                        key={col.id}
                        logo={col.insignia}
                        ocrResult={col.name}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof Rule) {
                    return (
                      <Ballot.PartyHeader
                        key={col.id}
                        ocrResult={col.rule}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof Candidate) {
                    return (
                      <Ballot.Candidate
                        key={col.id}
                        img={col.img}
                        ocrResult={col.name}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof WriteInCandidate) {
                    return (
                      <Ballot.WriteIn
                        key={col.id}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof EmptyCandidacy) {
                    return <Ballot.EmptyCandidacy key={col.id} />
                  }

                  return (
                    <Ballot.SectionHeader key={col.id} ocrResult={col.info} />
                  )
                }
              )}
            </div>
          )
        }
      )}
    </div>
  )
}
