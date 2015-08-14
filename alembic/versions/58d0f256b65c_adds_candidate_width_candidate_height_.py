"""Adds `candidate_width` & `candidate_height` fields

Revision ID: 58d0f256b65c
Revises: 3d8c307f8f2b
Create Date: 2015-08-10 15:04:27.831893

"""

# revision identifiers, used by Alembic.
revision = '58d0f256b65c'
down_revision = '3d8c307f8f2b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ''' Adds `candidate_width` & `candidate_height` fields. '''
    op.add_column(
        'Candidates',
        sa.Column(
            'candidate_width',
            sa.Integer())  # , nullable=False)
        # Breaks due to existing candidates in the DB
    )
    op.add_column(
        'Candidates',
        sa.Column(
            'candidate_height',
            sa.Integer())  # , nullable=False)
        # Breaks due to existing candidates in the DB
    )


def downgrade():
    ''' Drops `candidate_width` & `candidate_height` fields. '''
    op.drop_column('Candidates', 'candidate_width')
    op.drop_column('Candidates', 'candidate_height')
