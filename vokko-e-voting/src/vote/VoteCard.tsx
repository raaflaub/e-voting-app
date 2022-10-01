import React, {ReactNode, useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import VoteHeader from "./VoteHeader";
import {Collapse, Fade} from "@mui/material";
import {IVoting} from "../api/model/ivoting";

export type VoteCardProps = {
    motion: IVoting,
    isTieBreakVote?: boolean;
    collapsed?: boolean,
    collapsedSize?: string,
    collapsedContent?: ReactNode,
    children: ReactNode
}

export default function VoteCard({ motion, isTieBreakVote, collapsed, collapsedSize, collapsedContent, children }: VoteCardProps) {

    const [ showCollapsedContent, setShowCollapsedContent ] = useState(collapsed);

    const transitionExited = () => {
        setShowCollapsedContent(collapsed);
    }

    return (
        <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
                <VoteHeader motion={motion} isTieBreakVote={isTieBreakVote}/>
            </CardContent>
            <Collapse in={!collapsed} timeout={1000} collapsedSize={collapsedSize} onExited={transitionExited}>
                <CardContent>
                    {
                        <Fade in={showCollapsedContent} timeout={200}>
                            <div>{collapsedContent}</div>
                        </Fade>
                    }
                    {
                        <Fade in={!collapsed} timeout={1000}>
                            <div>{children}</div>
                        </Fade>
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
}
